import EventEmitter from "wolfy87-eventemitter";
import OrganizationFullPage from "../src/OrganizationFullPage";
import { IOrgFullPageLocationInitData, LocationType } from "../src/types";
import { OrganizationDetails } from "../src/types/organization.types";

describe("OrganizationFullPage", () => {
    const mockConnection = {
        sendToParent: jest.fn().mockReturnValue(Promise.resolve({})),
    };
    const mockEmitter: EventEmitter = new EventEmitter();
    const mockData: IOrgFullPageLocationInitData = {
        type: LocationType.ORGANIZATION_FULL_PAGE,
        app_id: "app_id",
        installation_uid: "installation_uid",
        extension_uid: "extension_uid",
        region: "NA",
        stack: {} as any,
        user: {} as any,
        currentBranch: "currentBranch",
        organization: {} as OrganizationDetails,
    };
    const organizationFullPage = new OrganizationFullPage(
        mockData,
        mockConnection as any,
        mockEmitter
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return organization details", () => {
        expect(organizationFullPage.currentOrganization).toBe(mockData.organization);
    });

    it("should handle missing organization details", () => {
        const invalidData: IOrgFullPageLocationInitData = {
            ...mockData,
            organization: null as any, // check missing organization details
        };
        const invalidOrganizationFullPage = new OrganizationFullPage(
            invalidData,
            mockConnection as any,
            mockEmitter
        );
        expect(invalidOrganizationFullPage.currentOrganization).toBeNull();
    });
});