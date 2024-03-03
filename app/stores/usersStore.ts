import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User } from "../models/user";

export default class UsersStore {
  userRegistry = new Map<string, User>();
  selectedUser: User | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get usersById() {
    return Array.from(this.userRegistry.values()).sort(
      (a, b) => parseInt(a.userId) - parseInt(b.userId)
    );
  }
  loadUsers = async () => {
    this.loadingInitial = true;
    try {
      const users = await agent.Users.list();
      users.forEach((user) => {
        this.setUser(user);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadUser = async (userId: string) => {
    let user = this.getUser(userId);
    if (user) {
      this.selectedUser = user;
    } else {
      this.loadingInitial = true;
      try {
        user = await agent.Users.details(userId);
        this.setUser(user);
        runInAction(() => {
          this.selectedUser = user;
        })
        this.setLoadingInitial(false);
        return user;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setUser = (user: User) => {
    this.userRegistry.set(user.userId, user);
  };

  private getUser= (userId: string) => {
    return this.userRegistry.get(userId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createUser = async (user: User) => {
    this.loading = true;
    try {
      await agent.Users.create(user);
      runInAction(() => {
        this.userRegistry.set(user.userId, user);
        this.selectedUser = user;
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

  updateUser = async (user: User) => {
    this.loading = true;
    try {
      await agent.Users.update(user);
      runInAction(() => {
        this.userRegistry.set(user.userId, user);
        this.selectedUser = user;
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

  deleteUser = async (userId: string) => {
    this.loading = true;
    try {
      await agent.Users.delete(userId);
      runInAction(() => {
        this.userRegistry.delete(userId);
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
