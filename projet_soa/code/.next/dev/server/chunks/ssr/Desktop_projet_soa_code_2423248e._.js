module.exports = [
"[project]/Desktop/projet_soa/code/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Desktop/projet_soa/code/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/projet_soa/code/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/projet_soa/code/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/projet_soa/code/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/projet_soa/code/actions/data:bab1e8 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40d61431c22618dea212fd161ac64944182ee18428":"loginUser"},"Desktop/projet_soa/code/actions/auth.ts",""] */ __turbopack_context__.s([
    "loginUser",
    ()=>loginUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var loginUser = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40d61431c22618dea212fd161ac64944182ee18428", __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "loginUser"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcidcclxuXHJcbi8vIEludGVyZmFjZXMgYmFzw6llcyBzdXIgdm9zIERUT3MgU3ByaW5nIEJvb3RcclxuZXhwb3J0IGludGVyZmFjZSBMb2dpblJlcXVlc3Qge1xyXG4gIGVtYWlsOiBzdHJpbmdcclxuICBwYXNzd29yZDogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlclJlc3BvbnNlIHtcclxuICBpZDogbnVtYmVyXHJcbiAgbm9tOiBzdHJpbmdcclxuICBlbWFpbDogc3RyaW5nXHJcbiAgcm9sZTogJ1BBU1NBR0VSJyB8ICdDT05EVUNURVVSJyB8ICdBRE1JTicgLy8gQWRhcHTDqSBzZWxvbiB2b3RyZSBlbnVtIFVzZXJSb2xlXHJcbiAgY3JlYXRlZEF0OiBzdHJpbmdcclxuICB1cGRhdGVkQXQ6IHN0cmluZ1xyXG4gIHRlbGVwaG9uZT86IHN0cmluZ1xyXG4gIG51bWVyb1Blcm1pcz86IHN0cmluZ1xyXG4gIGJ1c0Fzc2lnbmU/OiBzdHJpbmdcclxuICBhZG1pbkNvZGU/OiBzdHJpbmdcclxuICB0b2tlbjogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aFJlc3BvbnNlIHtcclxuICBzdWNjZXNzOiBib29sZWFuXHJcbiAgZGF0YT86IFVzZXJSZXNwb25zZVxyXG4gIGVycm9yPzogc3RyaW5nXHJcbiAgc3RhdHVzOiBudW1iZXJcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjdGlvbiBwb3VyIGwnYXV0aGVudGlmaWNhdGlvbiB1dGlsaXNhdGV1clxyXG4gKiBcclxuICogQ2V0IGVuZHBvaW50IHBlcm1ldCA6XHJcbiAqIC0g4pyFIFbDqXJpZmllciBsZXMgaWRlbnRpZmlhbnRzIChlbWFpbC9tb3QgZGUgcGFzc2UpXHJcbiAqIC0g4pyFIEF1dGhlbnRpZmllciBsJ3V0aWxpc2F0ZXVyIHZpYSBTcHJpbmcgU2VjdXJpdHlcclxuICogLSDinIUgR8OpbsOpcmVyIHVuIHRva2VuIEpXVCBlbiBjYXMgZGUgc3VjY8Ooc1xyXG4gKiAtIOKchSBSZXRvdXJuZXIgbGVzIGluZm9ybWF0aW9ucyB1dGlsaXNhdGV1ciBjb21wbMOodGVzICsgdG9rZW5cclxuICogXHJcbiAqIFJldG91cm5lIGVuIGNhcyBkZSBzdWNjw6hzICgyMDApIDpcclxuICoge1xyXG4gKiAgIFwiaWRcIjogMSxcclxuICogICBcIm5vbVwiOiBcIkpvaG4gRG9lXCIsXHJcbiAqICAgXCJlbWFpbFwiOiBcImpvaG5AZXhhbXBsZS5jb21cIixcclxuICogICBcInJvbGVcIjogXCJQQVNTQUdFUlwiLFxyXG4gKiAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNC0wMS0wMVQwMDowMDowMFwiLFxyXG4gKiAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNC0wMS0wMVQwMDowMDowMFwiLFxyXG4gKiAgIFwidGVsZXBob25lXCI6IFwiKzEyMzQ1Njc4OVwiLFxyXG4gKiAgIFwidG9rZW5cIjogXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuLi5cIlxyXG4gKiB9XHJcbiAqIFxyXG4gKiBSZXRvdXJuZSBlbiBjYXMgZCfDqWNoZWMgOlxyXG4gKiAtIDQwMSA6IFwiRW1haWwgb3UgbW90IGRlIHBhc3NlIGluY29ycmVjdFwiXHJcbiAqIC0gNTAwIDogXCJFcnJldXIgbG9ycyBkZSBsYSBjb25uZXhpb246IC4uLlwiXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW5Vc2VyKGNyZWRlbnRpYWxzOiBMb2dpblJlcXVlc3QpOiBQcm9taXNlPEF1dGhSZXNwb25zZT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBBUElfQkFTRV9VUkwgPSBwcm9jZXNzLmVudi5BUElfQkFTRV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCdcclxuICAgIFxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtBUElfQkFTRV9VUkx9L2FwaS9hdXRoL2xvZ2luYCwge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWxzKSxcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG5cclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gZGF0YSA6ICdFcnJldXIgbG9ycyBkZSBsYSBjb25uZXhpb24nLFxyXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDb252ZXJzaW9uIGRlcyBkYXRlcyBzaSBuw6ljZXNzYWlyZVxyXG4gICAgY29uc3QgdXNlclJlc3BvbnNlOiBVc2VyUmVzcG9uc2UgPSB7XHJcbiAgICAgIC4uLmRhdGEsXHJcbiAgICAgIGNyZWF0ZWRBdDogZGF0YS5jcmVhdGVkQXQsXHJcbiAgICAgIHVwZGF0ZWRBdDogZGF0YS51cGRhdGVkQXRcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBkYXRhOiB1c2VyUmVzcG9uc2UsXHJcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXHJcbiAgICB9XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJldXIgYXV0aDonLCBlcnJvcilcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBlcnJvcjogJ0VycmV1ciBkZSBjb25uZXhpb24gYXUgc2VydmV1cicsXHJcbiAgICAgIHN0YXR1czogNTAwXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRm9uY3Rpb24gdXRpbGl0YWlyZSBwb3VyIHN0b2NrZXIgbGUgdG9rZW4gKGPDtHTDqSBjbGllbnQpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RvcmVBdXRoVG9rZW4odG9rZW46IHN0cmluZyk6IHZvaWQge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dGhfdG9rZW4nLCB0b2tlbilcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb25jdGlvbiB1dGlsaXRhaXJlIHBvdXIgcsOpY3Vww6lyZXIgbGUgdG9rZW4gKGPDtHTDqSBjbGllbnQpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aFRva2VuKCk6IHN0cmluZyB8IG51bGwge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhdXRoX3Rva2VuJylcclxuICB9XHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuLyoqXHJcbiAqIEZvbmN0aW9uIHV0aWxpdGFpcmUgcG91ciBzdXBwcmltZXIgbGUgdG9rZW4gKGTDqWNvbm5leGlvbilcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBdXRoVG9rZW4oKTogdm9pZCB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYXV0aF90b2tlbicpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVsOpcmlmaWUgc2kgbCd1dGlsaXNhdGV1ciBlc3QgYXV0aGVudGlmacOpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBnZXRBdXRoVG9rZW4oKSAhPT0gbnVsbFxyXG59XHJcblxyXG4vKipcclxuICogUsOpY3Vww6hyZSBsZXMgaW5mb3JtYXRpb25zIHV0aWxpc2F0ZXVyIGRlcHVpcyBsZSB0b2tlbiAoc2kgZMOpY29kYWJsZSBjw7R0w6kgY2xpZW50KVxyXG4gKiBOb3RlOiBQb3VyIHVuZSB2w6lyaWZpY2F0aW9uIGNvbXBsw6h0ZSwgaWwgZmF1dCBhcHBlbGVyIHVuIGVuZHBvaW50IGJhY2tlbmRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyRnJvbVRva2VuKCk6IHsgZW1haWw6IHN0cmluZzsgcm9sZTogc3RyaW5nIH0gfCBudWxsIHtcclxuICBjb25zdCB0b2tlbiA9IGdldEF1dGhUb2tlbigpXHJcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGxcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIETDqWNvZGFnZSBiYXNpcXVlIGR1IHRva2VuIEpXVCAoc2FucyB2w6lyaWZpY2F0aW9uIGRlIHNpZ25hdHVyZSlcclxuICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKGF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbWFpbDogcGF5bG9hZC5zdWIsXHJcbiAgICAgIHJvbGU6IHBheWxvYWQucm9sZVxyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjBTQXNEc0IifQ==
}),
"[project]/Desktop/projet_soa/code/actions/data:e246b0 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40ac26caf1531e0ad714328f46b60c1d5c4e69a9ab":"storeAuthToken"},"Desktop/projet_soa/code/actions/auth.ts",""] */ __turbopack_context__.s([
    "storeAuthToken",
    ()=>storeAuthToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var storeAuthToken = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40ac26caf1531e0ad714328f46b60c1d5c4e69a9ab", __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "storeAuthToken"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcidcclxuXHJcbi8vIEludGVyZmFjZXMgYmFzw6llcyBzdXIgdm9zIERUT3MgU3ByaW5nIEJvb3RcclxuZXhwb3J0IGludGVyZmFjZSBMb2dpblJlcXVlc3Qge1xyXG4gIGVtYWlsOiBzdHJpbmdcclxuICBwYXNzd29yZDogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlclJlc3BvbnNlIHtcclxuICBpZDogbnVtYmVyXHJcbiAgbm9tOiBzdHJpbmdcclxuICBlbWFpbDogc3RyaW5nXHJcbiAgcm9sZTogJ1BBU1NBR0VSJyB8ICdDT05EVUNURVVSJyB8ICdBRE1JTicgLy8gQWRhcHTDqSBzZWxvbiB2b3RyZSBlbnVtIFVzZXJSb2xlXHJcbiAgY3JlYXRlZEF0OiBzdHJpbmdcclxuICB1cGRhdGVkQXQ6IHN0cmluZ1xyXG4gIHRlbGVwaG9uZT86IHN0cmluZ1xyXG4gIG51bWVyb1Blcm1pcz86IHN0cmluZ1xyXG4gIGJ1c0Fzc2lnbmU/OiBzdHJpbmdcclxuICBhZG1pbkNvZGU/OiBzdHJpbmdcclxuICB0b2tlbjogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aFJlc3BvbnNlIHtcclxuICBzdWNjZXNzOiBib29sZWFuXHJcbiAgZGF0YT86IFVzZXJSZXNwb25zZVxyXG4gIGVycm9yPzogc3RyaW5nXHJcbiAgc3RhdHVzOiBudW1iZXJcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjdGlvbiBwb3VyIGwnYXV0aGVudGlmaWNhdGlvbiB1dGlsaXNhdGV1clxyXG4gKiBcclxuICogQ2V0IGVuZHBvaW50IHBlcm1ldCA6XHJcbiAqIC0g4pyFIFbDqXJpZmllciBsZXMgaWRlbnRpZmlhbnRzIChlbWFpbC9tb3QgZGUgcGFzc2UpXHJcbiAqIC0g4pyFIEF1dGhlbnRpZmllciBsJ3V0aWxpc2F0ZXVyIHZpYSBTcHJpbmcgU2VjdXJpdHlcclxuICogLSDinIUgR8OpbsOpcmVyIHVuIHRva2VuIEpXVCBlbiBjYXMgZGUgc3VjY8Ooc1xyXG4gKiAtIOKchSBSZXRvdXJuZXIgbGVzIGluZm9ybWF0aW9ucyB1dGlsaXNhdGV1ciBjb21wbMOodGVzICsgdG9rZW5cclxuICogXHJcbiAqIFJldG91cm5lIGVuIGNhcyBkZSBzdWNjw6hzICgyMDApIDpcclxuICoge1xyXG4gKiAgIFwiaWRcIjogMSxcclxuICogICBcIm5vbVwiOiBcIkpvaG4gRG9lXCIsXHJcbiAqICAgXCJlbWFpbFwiOiBcImpvaG5AZXhhbXBsZS5jb21cIixcclxuICogICBcInJvbGVcIjogXCJQQVNTQUdFUlwiLFxyXG4gKiAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyNC0wMS0wMVQwMDowMDowMFwiLFxyXG4gKiAgIFwidXBkYXRlZEF0XCI6IFwiMjAyNC0wMS0wMVQwMDowMDowMFwiLFxyXG4gKiAgIFwidGVsZXBob25lXCI6IFwiKzEyMzQ1Njc4OVwiLFxyXG4gKiAgIFwidG9rZW5cIjogXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuLi5cIlxyXG4gKiB9XHJcbiAqIFxyXG4gKiBSZXRvdXJuZSBlbiBjYXMgZCfDqWNoZWMgOlxyXG4gKiAtIDQwMSA6IFwiRW1haWwgb3UgbW90IGRlIHBhc3NlIGluY29ycmVjdFwiXHJcbiAqIC0gNTAwIDogXCJFcnJldXIgbG9ycyBkZSBsYSBjb25uZXhpb246IC4uLlwiXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW5Vc2VyKGNyZWRlbnRpYWxzOiBMb2dpblJlcXVlc3QpOiBQcm9taXNlPEF1dGhSZXNwb25zZT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBBUElfQkFTRV9VUkwgPSBwcm9jZXNzLmVudi5BUElfQkFTRV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCdcclxuICAgIFxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtBUElfQkFTRV9VUkx9L2FwaS9hdXRoL2xvZ2luYCwge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNyZWRlbnRpYWxzKSxcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG5cclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gZGF0YSA6ICdFcnJldXIgbG9ycyBkZSBsYSBjb25uZXhpb24nLFxyXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDb252ZXJzaW9uIGRlcyBkYXRlcyBzaSBuw6ljZXNzYWlyZVxyXG4gICAgY29uc3QgdXNlclJlc3BvbnNlOiBVc2VyUmVzcG9uc2UgPSB7XHJcbiAgICAgIC4uLmRhdGEsXHJcbiAgICAgIGNyZWF0ZWRBdDogZGF0YS5jcmVhdGVkQXQsXHJcbiAgICAgIHVwZGF0ZWRBdDogZGF0YS51cGRhdGVkQXRcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBkYXRhOiB1c2VyUmVzcG9uc2UsXHJcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXHJcbiAgICB9XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJldXIgYXV0aDonLCBlcnJvcilcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBlcnJvcjogJ0VycmV1ciBkZSBjb25uZXhpb24gYXUgc2VydmV1cicsXHJcbiAgICAgIHN0YXR1czogNTAwXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRm9uY3Rpb24gdXRpbGl0YWlyZSBwb3VyIHN0b2NrZXIgbGUgdG9rZW4gKGPDtHTDqSBjbGllbnQpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RvcmVBdXRoVG9rZW4odG9rZW46IHN0cmluZyk6IHZvaWQge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F1dGhfdG9rZW4nLCB0b2tlbilcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb25jdGlvbiB1dGlsaXRhaXJlIHBvdXIgcsOpY3Vww6lyZXIgbGUgdG9rZW4gKGPDtHTDqSBjbGllbnQpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aFRva2VuKCk6IHN0cmluZyB8IG51bGwge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhdXRoX3Rva2VuJylcclxuICB9XHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuLyoqXHJcbiAqIEZvbmN0aW9uIHV0aWxpdGFpcmUgcG91ciBzdXBwcmltZXIgbGUgdG9rZW4gKGTDqWNvbm5leGlvbilcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBdXRoVG9rZW4oKTogdm9pZCB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYXV0aF90b2tlbicpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVsOpcmlmaWUgc2kgbCd1dGlsaXNhdGV1ciBlc3QgYXV0aGVudGlmacOpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBnZXRBdXRoVG9rZW4oKSAhPT0gbnVsbFxyXG59XHJcblxyXG4vKipcclxuICogUsOpY3Vww6hyZSBsZXMgaW5mb3JtYXRpb25zIHV0aWxpc2F0ZXVyIGRlcHVpcyBsZSB0b2tlbiAoc2kgZMOpY29kYWJsZSBjw7R0w6kgY2xpZW50KVxyXG4gKiBOb3RlOiBQb3VyIHVuZSB2w6lyaWZpY2F0aW9uIGNvbXBsw6h0ZSwgaWwgZmF1dCBhcHBlbGVyIHVuIGVuZHBvaW50IGJhY2tlbmRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyRnJvbVRva2VuKCk6IHsgZW1haWw6IHN0cmluZzsgcm9sZTogc3RyaW5nIH0gfCBudWxsIHtcclxuICBjb25zdCB0b2tlbiA9IGdldEF1dGhUb2tlbigpXHJcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGxcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIETDqWNvZGFnZSBiYXNpcXVlIGR1IHRva2VuIEpXVCAoc2FucyB2w6lyaWZpY2F0aW9uIGRlIHNpZ25hdHVyZSlcclxuICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKGF0b2IodG9rZW4uc3BsaXQoJy4nKVsxXSkpXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbWFpbDogcGF5bG9hZC5zdWIsXHJcbiAgICAgIHJvbGU6IHBheWxvYWQucm9sZVxyXG4gICAgfVxyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IitTQXNHZ0IifQ==
}),
"[project]/Desktop/projet_soa/code/components/login-form.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginForm",
    ()=>LoginForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bus$3e$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/lucide-react/dist/esm/icons/bus.js [app-ssr] (ecmascript) <export default as Bus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader$3e$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/node_modules/lucide-react/dist/esm/icons/loader.js [app-ssr] (ecmascript) <export default as Loader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$data$3a$bab1e8__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/data:bab1e8 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$data$3a$e246b0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/Desktop/projet_soa/code/actions/data:e246b0 [app-ssr] (ecmascript) <text/javascript>");
"use client";
;
;
;
;
;
;
;
function LoginForm() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        setSuccess(false);
        if (!email || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }
        if (!email.includes("@")) {
            setError("Veuillez entrer une adresse email valide");
            return;
        }
        setIsLoading(true);
        try {
            // Appel réel à l'API d'authentification
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$data$3a$bab1e8__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["loginUser"])({
                email,
                password
            });
            if (result.success && result.data) {
                // Stocker le token
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$actions$2f$data$3a$e246b0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["storeAuthToken"])(result.data.token);
                setSuccess(true);
                // Redirection selon le rôle
                setTimeout(()=>{
                    switch(result.data.role){
                        case "ADMIN":
                            router.push("/admin");
                            break;
                        case "CONDUCTEUR":
                            router.push("/");
                            break;
                        case "PASSAGER":
                            router.push("/passenger/trajets");
                            break;
                        default:
                            router.push("/");
                    }
                }, 1500);
            } else {
                setError(result.error || "Erreur de connexion");
            }
        } catch (err) {
            setError("Erreur de connexion au serveur");
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl shadow-xl overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#1e40af] p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-full p-3 shadow-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bus$3e$__["Bus"], {
                                    className: "w-8 h-8 text-[#1e40af]"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-white mb-2",
                            children: "CityTransit"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-blue-100 text-sm",
                            children: "Accédez à votre espace de gestion du transport"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-8",
                    children: [
                        success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-4 bg-green-50 border border-green-200 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-green-800 text-sm font-medium",
                                children: "✓ Connexion réussie! Redirection en cours..."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-800 text-sm font-medium",
                                children: [
                                    "⚠ ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "email",
                                            className: "block text-sm font-semibold text-gray-700",
                                            children: "Adresse Email"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    className: "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "email",
                                                    type: "email",
                                                    placeholder: "email@entreprise-transport.com",
                                                    value: email,
                                                    onChange: (e)=>setEmail(e.target.value),
                                                    disabled: isLoading,
                                                    className: "pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50",
                                                    "aria-label": "Adresse email"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "password",
                                            className: "block text-sm font-semibold text-gray-700",
                                            children: "Mot de passe"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                    className: "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "password",
                                                    type: showPassword ? "text" : "password",
                                                    placeholder: "••••••••",
                                                    value: password,
                                                    onChange: (e)=>setPassword(e.target.value),
                                                    disabled: isLoading,
                                                    className: "pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent disabled:bg-gray-50",
                                                    "aria-label": "Mot de passe"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setShowPassword(!showPassword),
                                                    disabled: isLoading,
                                                    className: "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50",
                                                    "aria-label": showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe",
                                                    children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 35
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 68
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: isLoading,
                                    className: "w-full py-3 bg-[#1e40af] text-white font-semibold rounded-lg hover:bg-[#1a3a8a] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader$3e$__["Loader"], {
                                                className: "w-5 h-5 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                lineNumber: 164,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Connexion en cours..."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                                lineNumber: 165,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true) : "Se connecter"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 pt-6 border-t border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-4 justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "text-[#1e40af] hover:text-[#1a3a8a] font-medium transition-colors",
                                        children: "Mot de passe oublié ?"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#",
                                        className: "text-gray-600 hover:text-gray-700 font-medium transition-colors",
                                        children: "Support technique"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 px-8 py-4 text-center border-t border-gray-100",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$projet_soa$2f$code$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "© 2025 TransitPro. Tous droits réservés."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/projet_soa/code/components/login-form.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_projet_soa_code_2423248e._.js.map