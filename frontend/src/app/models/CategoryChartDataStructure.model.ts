export interface CategoryChartDataStructure {
    labels:[],
    datasets: [{
      label: string,
      data: number[],
      backgroundColor: string[],
      hoverOffset: number
    }]
}