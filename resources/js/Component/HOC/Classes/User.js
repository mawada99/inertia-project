import { Globals } from "./Globals";

export class User {
    constructor(userData) {
        console.log(userData);

        this.id = userData.id;
        // this.member = userData.member;
        // this.account = userData.account;

        // this.isSuper = userData.isSuper;
        // this.userBranches = userData.userBranches;
        // this.roles = userData.roles;
        // this.glAccount = userData.glAccount;
        this.email = userData.email;
        this.name = userData.name;
        this.permissions = userData.permissions.map(
            (permission) => permission.slug
        );
    }

    hasPermission(permission) {
        if (this.isSuper) return true;

        if (Array.isArray(permission))
            return this.permissions.some((i) => permission?.includes(i));

        return this.permissions.includes(permission);
    }

    // canAccessBranch(branchId) {
    //     if (this.hasPermission("core.branch.use_any")) return true;

    //     return this.userBranches.some((i) => i.branch.id === branchId);
    // }

    // get warehousing() {
    //     const customerWarehousing =
    //         this.account == null || this.account.warehousing;
    //     const warehousing = Globals?.settings?.warehousing;
    //     return (
    //         warehousing &&
    //         this.hasPermission("shipping.product.list") &&
    //         customerWarehousing
    //     );
    // }
}
