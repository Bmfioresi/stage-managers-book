// for each hub -->
// Designer Files Metadata Schema
const designerFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// Designer Chunks Schema (this is specific to the GridFSBucket)
const designerChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// Resources Files Metadata Schema
const resourcesFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// Resources Chunks Schema (this is specific to the GridFSBucket)  
const resourcesChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// Scripts File Metadata Schema
const scriptsFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// Scripts Chunks Schema (this is specific to the GridFSBucket)
const scriptsChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// <-- For each hub

// Credentials -->

// Credentials Schema
const credentialsSchema = new mongoose.Schema({
    _id: ObjectId,
    username: String,
    password: String,
    uid: Int32Array,
    failedLoginAttempts: Int32Array,
    lockUntil: Date
});

// Unique Count Document Identifier Schema 
const uniqueCountSchema = new mongoose.Schema({
    _id: ObjectId, // Unique identifier for the document
    username: { type: String, unique: true }, // Username as a unique identifier
    password: String, // Password associated with the unique identifier (hashed)
    count: [Number], // Array of counts associated with the unique identifier
});

// uid Counter Schema
const uidCounterSchema = new mongoose.Schema({
    _id: ObjectId,
    next_uid: Int32Array,
    name: String
});

// <-- Credentials 

// Files Schemas -->

// example show-resources chunks schema
const exampleShowResourcesChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// example show-resources metadata schema
const exampleShowResourcesFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// images chunks schema
const imagesChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// images metadata schema
const imagesFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// Test Designer Chunks Schema
const testDesignerChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// Test Designer Files Metadata Schema
const testDesignerFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// Test Resources Chunks Schema
const testResourcesChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// Test Resources Files Metadata Schema
const testResourcesFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// <-- Files Schemas

// Hub Schemas -->

// Hub Info Schema
const hubInfoSchema = new mongoose.Schema({
    _id: ObjectId,
    hid: Int32Array,
    owner: Int32Array,
    name: String,
    access_code: String,
    whiteList: [String],
    description: String,
    announcements: [String],
    blackList: [String],
    join_requests: [String]
});

// Hub Unique Count Document Identifier Schema
const hubUniqueCountSchema = new mongoose.Schema({
    _id: ObjectId, // Unique identifier for the document
    password: String, // Password associated with the unique identifier (hashed)
    code: BigInt64Array,
    name: String,
    count: Int32Array
});

// <-- Hub Schema


// Profile Schemas -->

// Headshot Chunks Schema
const headshotChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// Headshot Files Metadata Schema  
const headshotFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// Profile Schema
const profileSchema = new mongoose.Schema({
    _id: ObjectId,
    uid: Int32Array,
    name: String,
    bio: String,
    phone_number: String,
    email_address: String,
    pronouns: String,
    roles: String,
    hids: [String],
    headshotName: String,
    resumeName: String
});

// Undefined Chunks Schema
const undefinedChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// Undefined Files Metadata Schema
const undefinedFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// <-- Profile Schema

// Test Schemas -->

// <-- Test Schemas

// Unit Test Schemas -->

// Unit Test Chunks Schema
const unitTestChunksSchema = new mongoose.Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Int32Array,
    data: Binary
});

// Unit Test Files Metadata Schema
const unitTestFilesSchema = new mongoose.Schema({
    _id: ObjectId,
    length: Int32Array,
    chunkSize: Int32Array,
    uploadDate: Date,
    filename: String
});

// <-- Unit Test Schemas