/**
 * Aligns with app-extension-component `MIN_VALIDATION_VERSION` — bridge validates
 * complex setData only at this app-sdk version or newer.
 */
const MIN_SDK_VERSION_FOR_COMPLEX_NON_SELF_SETDATA = "2.4.0";

let appSdkInitVersion: string | null = null;

/**
 * Called from {@link UiLocation.initialize} with the same version string the app passes at init.
 */
export function setAppSdkInitVersion(version: string): void {
    appSdkInitVersion = version?.trim() ?? "";
}

/** @internal Test helper — clears init version so non-self complex setData is restricted. */
export function resetAppSdkInitVersionForTests(): void {
    appSdkInitVersion = null;
}

function parseVersion(v: string): number[] | null {
    const parts = v.trim().split(/[.-]/).slice(0, 3);
    if (parts.length < 1) return null;
    const nums: number[] = [];
    for (const p of parts) {
        const n = parseInt(p, 10);
        if (Number.isNaN(n)) return null;
        nums.push(n);
    }
    while (nums.length < 3) nums.push(0);
    return nums;
}

function meetsMinComplexNonSelfSetDataVersion(version: string): boolean {
    if (!version) return false;
    const a = parseVersion(version);
    const b = parseVersion(MIN_SDK_VERSION_FOR_COMPLEX_NON_SELF_SETDATA);
    if (!a || !b) return false;
    for (let i = 0; i < 3; i++) {
        if (a[i] > b[i]) return true;
        if (a[i] < b[i]) return false;
    }
    return true;
}

/**
 * When true, `field.setData` for non-self fields (sidebar / `entry.getField`) must reject
 * complex types client-side — same as pre–bridge-validation SDK behavior.
 */
export function shouldExcludeComplexTypesForNonSelfSetData(): boolean {
    return !meetsMinComplexNonSelfSetDataVersion(appSdkInitVersion ?? "");
}
