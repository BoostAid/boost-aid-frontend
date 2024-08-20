interface ClusterStatus {
  PENDING: "PENDING";
  CREATING: "CREATING";
  INITING: "INITING";
  RUNNING: "RUNNING";
  STOPPED: "STOPPED";
  DELETED: "DELETED";
  ACTIVE: "ACTIVE";
  ANSWERED: "ANSWERED";
}

type ClusterPlan = "FREE" | "BUSINESS" | "PRO";

export interface Question {
  id: number;
  text: string;
  status: keyof ClusterStatus | null;
  company: string;
  authUserId: string;
  plan: ClusterPlan | null;
  network: string | null;
  createdAt: string;
  updatedAt: Date;
  delete: boolean | null;
}

export type ClustersArray = Cluster[] | undefined;
