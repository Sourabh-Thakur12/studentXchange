# studentXchange — Architecture

## System Overview
studentXchange is a React Native mobile application backed by a modular Appwrite monolith. The architecture prioritises clean module boundaries. All client-server communication goes through direct Appwrite SDK calls, organized into service files per domain (e.g., `authService.ts`, `listingService.ts`).

## Services
| Service          | Provider (MVP)     | Future Replacement   | Purpose                                    |
|------------------|--------------------|----------------------|--------------------------------------------|
| Auth             | Appwrite Auth      | AWS Cognito          | Student signup/login, session, email verify |
| Database         | Appwrite Database  | AWS DynamoDB / RDS   | Listings, users, ratings, rentals, transactions |
| Storage          | Appwrite Storage   | AWS S3 + CloudFront  | Listing photos and videos                  |
| Realtime         | Appwrite Realtime  | AWS WebSocket API    | Chat messages (active), live notifications |
| Push Notify      | TBD                | AWS SNS / FCM        | Push notifications to mobile               |
| Hosting          | Self-hosted VPS    | AWS EC2 / ECS        | Docker Compose deployment                  |

## Data Model (High-Level)
```text
Users
├── userId (PK)
├── name
├── email (DDUC domain)
├── avatarUrl
├── rating (computed)
├── createdAt
└── verified (boolean)

Listings
├── listingId (PK)
├── sellerId (FK → Users)
├── title
├── description
├── category
├── condition              ← new | like_new | good | fair | poor
├── images[] (Storage refs)
├── videos[] (Storage refs)
├── createdAt
├── updatedAt
│
│   ── SELL FIELDS ──
├── forSale (boolean)
├── sellPrice              ← nullable
├── sellStatus             ← available | sold | inactive. nullable
│
│   ── RENT FIELDS ──
├── forRent (boolean)
├── rentPrice              ← nullable
├── rentPeriod             ← daily | weekly | monthly. nullable
├── rentStatus             ← available | rented | inactive. nullable
└── rentAvailableAfter     ← nullable date

Rentals
├── rentalId (PK)
├── listingId (FK → Listings)
├── renterId (FK → Users)
├── ownerId (FK → Users)
├── startDate
├── endDate
├── actualReturnDate       ← null until returned
├── status (active | returned | overdue)
└── createdAt

Transactions
├── transactionId (PK)
├── listingId (FK → Listings)
├── sellerId (FK → Users)
├── buyerOrRenterId (FK → Users)
├── type (sale | rental)
├── rentalId (FK → Rentals) ← nullable
├── status (pending | confirmed | completed | cancelled)
├── confirmedBySeller (boolean)
├── confirmedByBuyer (boolean)
├── completedAt
└── createdAt

Ratings
├── ratingId (PK)
├── transactionId (FK → Transactions)
├── fromUserId (FK → Users)
├── toUserId (FK → Users)
├── score (1–5)
├── comment
├── type (buyer | seller | renter)
└── createdAt

Messages
├── messageId (PK)
├── conversationId
├── senderId (FK → Users)
├── receiverId (FK → Users)
├── listingId (FK → Listings)
├── content
├── readAt
└── createdAt
```

## API Contracts / Service Endpoints
Since we use Appwrite directly without a custom backend proxy, these "endpoints" map to our internal client-side service functions that wrap the Appwrite SDK. These map directly to task lists for GitHub projects.

### AuthService (`services/authService.ts`)
| Function | Appwrite SDK Method | Purpose |
|----------|---------------------|---------|
| `signUp(email, pass, name)` | `account.create()` | Register new student (must enforce @dduc.ac.in) |
| `verifyEmail(userId, secret)` | `account.updateVerification()` | Verify email ownership |
| `login(email, pass)` | `account.createEmailPasswordSession()` | Create device session |
| `logout()` | `account.deleteSession('current')` | Clear session |
| `getCurrentUser()` | `account.get()` | Fetch active session user profile |

### ListingService (`services/listingService.ts`)
| Function | Appwrite SDK Method | Purpose |
|----------|---------------------|---------|
| `createListing(data)` | `databases.createDocument()` | Create listing with sell/rent booleans |
| `getListings(filters, cursor)` | `databases.listDocuments()` | Feed queries with cursor pagination |
| `searchListings(query)` | `databases.listDocuments()` | Search using `Query.search('title', query)` |
| `getListing(id)` | `databases.getDocument()` | Fetch detail view |
| `updateListingStatus(id, status)`| `databases.updateDocument()` | Change sell/rent status |

### TransactionService (`services/transactionService.ts`)
| Function | Appwrite SDK Method | Purpose |
|----------|---------------------|---------|
| `initiateTransaction(data)` | `databases.createDocument()` | Create pending transaction |
| `confirmTransaction(id, role)` | `databases.updateDocument()` | Buyer/Seller sets `confirmedByX = true` |
| `getUserTransactions(userId)` | `databases.listDocuments()` | History for profile view |

### ChatService (`services/chatService.ts`)
| Function | Appwrite SDK Method | Purpose |
|----------|---------------------|---------|
| `getInbox(userId)` | `databases.listDocuments()` | Polled query for conversation list |
| `getMessages(convId, cursor)` | `databases.listDocuments()` | Fetch chat history |
| `sendMessage(data)` | `databases.createDocument()` | Send text to conversation |
| `subscribeToChat(convId, cb)` | `client.subscribe()` | Realtime listener for active chat screen |

### StorageService (`services/storageService.ts`)
| Function | Appwrite SDK Method | Purpose |
|----------|---------------------|---------|
| `uploadImage(file)` | `storage.createFile()` | Upload compressed image |
| `getImagePreview(id)` | `storage.getFilePreview()` | Generate/fetch thumbnail for feed |


## ADR Log

### ADR-001: Direct Appwrite SDK with Service Modules
**Status:** Accepted (Revised from previous proxy pattern)  
**Date:** 2026-06-11  
**Context:** We initially planned an abstraction layer to swap out Appwrite, but for a 3-person team building an MVP, that abstraction adds unnecessary boilerplate.  
**Decision:** Group direct Appwrite SDK calls into domain-specific service files (e.g., `listingService.ts`). Do not build generic interfaces (`IListingProvider`). If a migration to AWS is needed in the future, we rewrite these files.  
**Consequences:** Faster MVP velocity, fewer files to maintain. We can utilize Appwrite's Realtime and Query builders natively without leaking abstractions.  

### ADR-002: Hybrid Chat — Realtime for Active Conversation, Polling for Inbox
**Status:** Accepted  
**Date:** 2026-06-11  
**Context:** 500–1K concurrent users on a budget VPS. Pure Realtime would require 1,000–2,000 concurrent WebSockets, overloading the server.  
**Decision:** Use Appwrite Realtime only on the active chat screen (1 connection per user). Use 10s polling for the conversation inbox list.  
**Consequences:** WebSocket connections stay under 200 at peak. Acceptable ≤10s delay for new inbox indicators.  

### ADR-003: Basic Search with Debounce, Meilisearch Migration Path
**Status:** Accepted  
**Date:** 2026-06-11  
**Context:** Students need to search items, but Elasticsearch is too heavy (2-4GB RAM) for our budget VPS.  
**Decision:** MVP uses Appwrite `Query.search()` on `title` with a 300ms client-side debounce. If search quality becomes an issue, we add Meilisearch (~200MB RAM) as a Docker sidecar later.  
**Consequences:** Keeps MVP infra lean. No typo tolerance initially, but category browsing handles primary discovery.  

### ADR-004: Pull-to-Refresh with Scoped Cache Invalidation
**Status:** Accepted  
**Date:** 2026-06-11  
**Context:** Listing feed is read-heavy. Constant polling wastes bandwidth.  
**Decision:** Use client-side caching (`react-native-mmkv`, 30s TTL). Pull-to-refresh clears the cache ONLY for the currently applied filters, then lazy loads.  
**Consequences:** Saves DB reads. Users control refresh cadence.  

### ADR-005: Dual-Status Listing Model for Independent Sell/Rent Lifecycles
**Status:** Accepted  
**Date:** 2026-06-11  
**Context:** A single `status` and `price` field cannot represent an item that is both actively for sale and currently rented out.  
**Decision:** Split into `forSale` + `sellPrice` + `sellStatus` and `forRent` + `rentPrice` + `rentPeriod` + `rentStatus`.  
**Consequences:** Eliminates impossible states. Allows precise querying for available items.  

### ADR-006: Transaction Record to Gate Ratings
**Status:** Accepted  
**Date:** 2026-06-11  
**Context:** Ratings are gameable without proof of a completed transaction.  
**Decision:** Add a `Transactions` collection requiring dual confirmation. Ratings must reference `transactionId`.  
**Consequences:** Guarantees ratings come from actual buyers/sellers. Provides auditable transaction history for user profiles.  

## Open Architectural Questions
- **Mobile security:** How to secure auth tokens on-device, prevent API key exposure, and handle data privacy (encryption at rest on mobile)?
- **Performance at scale:** Appwrite on a self-hosted VPS — what are the bottlenecks at 500–1K concurrent users? Do we need Redis caching, connection pooling, or read replicas?
- **Image/video pipeline:** Compression strategy on-device before upload? Thumbnail generation server-side or client-side?
- **Push notification provider:** Appwrite built-in vs. Firebase Cloud Messaging (FCM)?
