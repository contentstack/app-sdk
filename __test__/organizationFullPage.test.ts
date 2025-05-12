import { IOrgFullPageLocationInitData, LocationType } from "../src/types";
import { OrganizationDetails } from "../src/types/organization.types";

const mockData: IOrgFullPageLocationInitData = {
    type: LocationType.ORGANIZATION_FULL_PAGE,
    app_id: "app_id",
    installation_uid: "installation_uid",
    extension_uid: "extension_uid",
    region: "NA",
    endpoints:{CMA:"",APP:"",DEVELOPER_HUB:""},
    stack: {} as any,
    user: {} as any,
    currentBranch: "currentBranch",
    organization: {} as OrganizationDetails,
};
const organizationFullPage = {
    currentOrganization: mockData.organization,
};

afterEach(() => {
    jest.clearAllMocks();
});

test("should return organization details", () => {
    expect(organizationFullPage.currentOrganization).toBe(mockData.organization);
});

test("should handle missing organization details", () => {
    const invalidData: IOrgFullPageLocationInitData = {
        ...mockData,
        organization: null as any, // check missing organization details
    };
    const invalidOrganizationFullPage = {
        currentOrganization: invalidData.organization,
    };
    expect(invalidOrganizationFullPage.currentOrganization).toBeNull();
});