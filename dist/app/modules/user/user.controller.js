"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = exports.createNewAccount = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createNewAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ email: userInfo.email });
        if (existingUser) {
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.CONFLICT,
                success: false,
                message: "User already exists",
                data: null,
            });
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(userInfo.password, 10);
        console.log(hashedPassword);
        // Create user
        const newUser = yield user_model_1.default.create(Object.assign(Object.assign({}, userInfo), { password: hashedPassword }));
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: "User created successfully",
            data: newUser,
        });
    }
    catch (error) {
        console.error(error);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.createNewAccount = createNewAccount;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_model_1.default.find().select("-password");
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Data fetched successfully",
            data: allUsers,
        });
    }
    catch (error) {
        console.error(error);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findById(id).select("-password");
        if (!user) {
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.NOT_FOUND,
                success: false,
                message: "User not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.getSingleUser = getSingleUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        // Hash password if provided in update
        if (updatedData.password) {
            updatedData.password = yield bcryptjs_1.default.hash(updatedData.password, 10);
        }
        const user = yield user_model_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        }).select("-password");
        if (!user) {
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.NOT_FOUND,
                success: false,
                message: "User not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Failed to update user",
            data: null,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findByIdAndDelete(id);
        if (!user) {
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.NOT_FOUND,
                success: false,
                message: "User not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User deleted successfully",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Failed to delete user",
            data: null,
        });
    }
});
exports.deleteUser = deleteUser;
