module.exports = [
"[project]/Desktop/projet_soa/code/actions/verifyEmailCode.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"603bcb3521dd0c3da4ea7ea032362a809bd6b234f8":"verifyEmailCode"},"",""] */ __turbopack_context__.s([
    "verifyEmailCode",
    ()=>verifyEmailCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function verifyEmailCode(prevState, formData) {
    const email = formData.get("email");
    const code = formData.get("code");
    if (!email || !code) {
        return {
            success: false,
            message: "Email ou code manquant"
        };
    }
    try {
        const res = await fetch("http://localhost:3001/api/utilisateurs/verify_code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                code
            })
        });
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: data.detail || "Code incorrect"
            };
        }
        const { token, role, user_id } = data // ← AJOUTER user_id
        ;
        // Redirection selon le rôle
        let redirect = "/passager/trajets";
        if (role === "ADMIN") {
            redirect = "/admin";
        } else if (role === "PASSAGER") {
            redirect = "/passager/trajets";
        } else if (role === "CONDUCTEUR") {
            redirect = "/conducteur";
        }
        return {
            success: true,
            message: "Code vérifié avec succès",
            token,
            role,
            userId: user_id,
            redirect
        };
    } catch (error) {
        console.error("Erreur côté client :", error);
        return {
            success: false,
            message: "Erreur réseau ou serveur"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    verifyEmailCode
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyEmailCode, "603bcb3521dd0c3da4ea7ea032362a809bd6b234f8", null);
}),
"[project]/Desktop/projet_soa/code/actions/resend_otp.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"409d6c119e710897b86e54372e3691cf082fabd8ee":"resendEmailCode"},"",""] */ __turbopack_context__.s([
    "resendEmailCode",
    ()=>resendEmailCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function resendEmailCode(email) {
    try {
        const res = await fetch("http://localhost:3001/api/utilisateurs/resend_code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        });
        if (!res.ok) {
            const data = await res.json();
            console.error("Erreur:", data.detail);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Erreur réseau:", error);
        return false;
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    resendEmailCode
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resendEmailCode, "409d6c119e710897b86e54372e3691cf082fabd8ee", null);
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/verify-otp/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/verifyEmailCode.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Desktop/projet_soa/code/actions/resend_otp.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$verifyEmailCode$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/verifyEmailCode.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$resend_otp$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/resend_otp.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/verify-otp/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/verifyEmailCode.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Desktop/projet_soa/code/actions/resend_otp.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "409d6c119e710897b86e54372e3691cf082fabd8ee",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$resend_otp$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resendEmailCode"],
    "603bcb3521dd0c3da4ea7ea032362a809bd6b234f8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$verifyEmailCode$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyEmailCode"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f2e$next$2d$internal$2f$server$2f$app$2f$verify$2d$otp$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$verifyEmailCode$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$resend_otp$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Desktop/projet_soa/code/.next-internal/server/app/verify-otp/page/actions.js { ACTIONS_MODULE0 => "[project]/Desktop/projet_soa/code/actions/verifyEmailCode.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/Desktop/projet_soa/code/actions/resend_otp.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$verifyEmailCode$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/verifyEmailCode.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$resend_otp$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/resend_otp.ts [app-rsc] (ecmascript)");
}),
"[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/Desktop/projet_soa/code/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=Desktop_projet_soa_code_fdc22aab._.js.map