import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Report } from "../models/report";

export default class ReportStore {
  reportRegistry = new Map<string, Report>();
  selectedReport: Report | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get reportsById() {
    return Array.from(this.reportRegistry.values()).sort(
      (a, b) => parseInt(a.reportId) - parseInt(b.reportId)
    );
  }

  get reportOptions() {
    return Array.from(this.reportRegistry.values())
  }
  loadReports = async () => {
    this.loadingInitial = true;
    try {
      const reports = await agent.Reports.list();
      reports.forEach((report) => {
        this.setReport(report);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadReport = async (reportId: string) => {
    let report = this.getReport(reportId);
    if (report) {
      this.selectedReport = report;
    } else {
      this.loadingInitial = true;
      try {
        report = await agent.Reports.details(reportId);
        this.setReport(report);
        runInAction(() => {
          this.selectedReport = report;
        })
        this.setLoadingInitial(false);
        return report;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setReport = (report: Report) => {
    this.reportRegistry.set(report.reportId, report);
  };

  private getReport = (reportId: string) => {
    return this.reportRegistry.get(reportId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createReport = async (report: Report) => {
    this.loading = true;
    try {
      await agent.Reports.create(report);
      runInAction(() => {
        this.reportRegistry.set(report.reportId, report);
        this.selectedReport = report;
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

  updateReport = async (report: Report) => {
    this.loading = true;
    try {
      await agent.Reports.update(report);
      runInAction(() => {
        this.reportRegistry.set(report.reportId, report);
        this.selectedReport = report;
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

  deleteReport = async (reportId: string) => {
    this.loading = true;
    try {
      await agent.Reports.delete(reportId);
      runInAction(() => {
        this.reportRegistry.delete(reportId);
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
