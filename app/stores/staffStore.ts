import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Staff } from "../models/staff";

export default class StaffStore {
  staffRegistry = new Map<string, Staff>();
  selectedStaff: Staff | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get staffsById() {
    return Array.from(this.staffRegistry.values()).sort(
      (a, b) => parseInt(a.staffId) - parseInt(b.staffId)
    );
  }

  get staffOptions() {
    return Array.from(this.staffRegistry.values())
  }
  loadStaffs = async () => {
    this.loadingInitial = true;
    try {
      const staffs = await agent.Staffs.list();
      staffs.forEach((staff) => {
        this.setStaff(staff);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadStaff = async (staffId: string) => {
    let staff = this.getStaff(staffId);
    if (staff) {
      this.selectedStaff = staff;
    } else {
      this.loadingInitial = true;
      try {
        staff = await agent.Staffs.details(staffId);
        this.setStaff(staff);
        runInAction(() => {
          this.selectedStaff = staff;
        })
        this.setLoadingInitial(false);
        return staff;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setStaff = (staff: Staff) => {
    this.staffRegistry.set(staff.staffId, staff);
  };

  private getStaff = (staffId: string) => {
    return this.staffRegistry.get(staffId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createStaff = async (staff: Staff) => {
    this.loading = true;
    try {
      await agent.Staffs.create(staff);
      runInAction(() => {
        this.staffRegistry.set(staff.staffId, staff);
        this.selectedStaff = staff;
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

  updateStaff = async (staff: Staff) => {
    this.loading = true;
    try {
      await agent.Staffs.update(staff);
      runInAction(() => {
        this.staffRegistry.set(staff.staffId, staff);
        this.selectedStaff = staff;
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

  deleteStaff = async (staffId: string) => {
    this.loading = true;
    try {
      await agent.Staffs.delete(staffId);
      runInAction(() => {
        this.staffRegistry.delete(staffId);
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
