module.exports = [
"[project]/Desktop/projet_soa/code/actions/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60ae3af215bb38f7b932e99f5a062c397c78f8f9b8":"signIn"},"",""] */ __turbopack_context__.s([
    "signIn",
    ()=>signIn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function signIn(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
        return {
            success: false,
            message: "Email et mot de passe requis"
        };
    }
    try {
        const res = await fetch("http://localhost:8001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: data.detail || "Erreur de connexion"
            };
        }
        return {
            success: true,
            message: "email envoyé",
            email: email,
            redirect: `/verify-otp?email=${encodeURIComponent(email)}`
        };
    } catch (error) {
        return {
            success: false,
            message: "Erreur de serveur"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    signIn
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signIn, "60ae3af215bb38f7b932e99f5a062c397c78f8f9b8", null);
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/auth.ts [app-rsc] (ecmascript)");
;
}),
"[project]/Desktop/projet_soa/code/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/projet_soa/code/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "60ae3af215bb38f7b932e99f5a062c397c78f8f9b8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signIn"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Desktop/projet_soa/code/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => "[project]/Desktop/projet_soa/code/actions/auth.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/auth.ts [app-rsc] (ecmascript)");
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

//# sourceMappingURL=Desktop_projet_soa_code_e82d30b5._.js.map