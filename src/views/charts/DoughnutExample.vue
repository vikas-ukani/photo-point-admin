<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  mounted() {
    this.renderChart(
      {
        labels: ["FREE", "PREMIUM", "PROFESSIONAL"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [40, 50, 60]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: true }
    );
  }
};
</script>
