import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Role } from "../models/role";

export default class RoleStore {
  roleRegistry = new Map<string, Role>();
  selectedRole: Role | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get rolesById() {
    return Array.from(this.roleRegistry.values()).sort(
      (a, b) => parseInt(a.roleId) - parseInt(b.roleId)
    );
  }
  loadRoles = async () => {
    this.loadingInitial = true;
    try {
      const roles = await agent.Roles.list();
      roles.forEach((role) => {
        this.setRole(role);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadRole = async (roleId: string) => {
    let role = this.getRole(roleId);
    if (role) {
      this.selectedRole = role;
    } else {
      this.loadingInitial = true;
      try {
        role = await agent.Roles.details(roleId);
        this.setRole(role);
        runInAction(() => {
          this.selectedRole = role;
        })
        this.setLoadingInitial(false);
        return role;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setRole = (role: Role) => {
    this.roleRegistry.set(role.roleId, role);
  };

  private getRole = (roleId: string) => {
    return this.roleRegistry.get(roleId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createRole = async (role: Role) => {
    this.loading = true;
    try {
      await agent.Roles.create(role);
      runInAction(() => {
        this.roleRegistry.set(role.roleId, role);
        this.selectedRole = role;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateRole = async (role: Role) => {
    this.loading = true;
    try {
      await agent.Roles.update(role);
      runInAction(() => {
        this.roleRegistry.set(role.roleId, role);
        this.selectedRole = role;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteRole = async (roleId: string) => {
    this.loading = true;
    try {
      await agent.Roles.delete(roleId);
      runInAction(() => {
        this.roleRegistry.delete(roleId);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
