export interface ChartGoal {
  goalName: string;
  goalId: string;
  achieves: {
    day?: number;
    hour?: number;
    count: string;
  }[];
}
