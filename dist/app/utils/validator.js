"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return (req, res, next) => {
        var _a, _b;
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            return res.status(400).json({
                status: "fail",
                message: ((_b = (_a = err === null || err === void 0 ? void 0 : err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || "Validation error",
            });
        }
    };
};
exports.default = validateRequest;
