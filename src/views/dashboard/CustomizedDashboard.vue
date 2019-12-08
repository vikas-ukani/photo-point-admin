<template>
  <div>
    <b-row>
      <b-col md="4">
        <b-card body-class="bg-gray-custom-color">
          <b-row>
            <b-col>
              <h5 id="traffic" class="card-title mb-4">DAILY SIGN UP</h5>
            </b-col>
          </b-row>
          <div class="chart-wrapper">
            <bar-example chartId="chart-bar-01" />
          </div>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card header body-class="bg-gray-custom-color">
          <b-row>
            <b-col>
              <h5 id="traffic" class="card-title mb-4">MEMBERSHIP DISTRIBUTION</h5>
            </b-col>
          </b-row>
          <div class="chart-wrapper">
            <doughnut-example chartId="chart-doughnut-01" />
          </div>
        </b-card>
      </b-col>

      <b-col md="4">
        <b-card body-class="bg-gray-custom-color">
          <b-row>
            <b-col>
              <h5 id="traffic" class="card-title mb-4">REVENUE</h5>
            </b-col>
          </b-row>
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Premium</span>
              <span class="ml-auto font-weight-bold">456</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                class="progress-xs bg-dark"
                style="height:20px"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Professional</span>
              <span class="ml-auto font-weight-bold">654</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Professional's Client Slot</span>
              <span class="ml-auto font-weight-bold">235</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="8" md="8">
        <b-card body-class="bg-gray-custom-color">
          <b-row>
            <b-col sm="5">
              <h4 id="traffic" class="card-title mb-0">MONTHLY STATS REVENUE</h4>
            </b-col>
          </b-row>
          <main-chart-example
            chartId="main-chart-01"
            class="chart-wrapper"
            style="height:300px;margin-top:40px;"
            height="300"
          ></main-chart-example>
        </b-card>

        <b-card body-class="bg-gray-custom-color">
          <b-row>
            <b-col sm="5">
              <h5 id="traffic" class="card-title mb-4">REPORT TICKET - DISPUTE</h5>
            </b-col>
          </b-row>
          <div>
            <b-row>
              <b-col md="2" class="mb-3">
                <p class="text-center mt-2 text-success">O</p>
              </b-col>
              <b-col md="10">
                <span>Dispute 01 - client 01</span>
                <p>date, time, report</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="2" class="mb-3">
                <p class="text-center mt-2 text-success">O</p>
              </b-col>
              <b-col md="10">
                <span>Complaint 01 - client 01</span>
                <p>date, time, report</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="2" class="mb-3">
                <p class="text-center mt-2 text-success">O</p>
              </b-col>
              <b-col md="10">
                <span>Feedback 01 - client 02</span>
                <p>date, time, report</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="2" class="mb-3">
                <p class="text-center mt-2 text-success">O</p>
              </b-col>
              <b-col md="10">
                <span>Comment 01 - client 01</span>
                <p>date, time, report</p>
              </b-col>
            </b-row>
          </div>
        </b-card>

        <b-card body-class="bg-gray-custom-color">
          <b-row>
            <b-col sm="5">
              <h5 id="traffic" class="card-title mb-4">SIGN UP REPORT</h5>
            </b-col>
          </b-row>
          <div>
            <table class="table table-hover table-responsive-sm">
              <tr>
                <th>Name</th>
                <th>ACC type</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>

              <tr>
                <td>Vikas</td>
                <td>Free</td>
                <td>Activated</td>
                <td>$xxxx</td>
              </tr>
              <tr>
                <td>Ukani</td>
                <td>Professional</td>
                <td>Paid</td>
                <td>$xxxx</td>
              </tr>
              <tr>
                <td>Anil</td>
                <td>Premium</td>
                <td>Not Activated</td>
                <td>$0</td>
              </tr>
            </table>
          </div>
        </b-card>
      </b-col>
      <b-col lg="4" md="4">
        <b-card body-class="bg-gray-custom-color">
          <b-row>
            <b-col>
              <h5 id="traffic" class="card-title mb-4">WALLET</h5>
            </b-col>
          </b-row>
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Top up</span>
              <span class="ml-auto font-weight-bold">$5392</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                class="progress-xs bg-dark"
                style="height:20px"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Escrow</span>
              <span class="ml-auto font-weight-bold">$9485</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <i class="icon-globe progress-group-icon"></i>
              <span class="title">Paid Out</span>
              <span class="ml-auto font-weight-bold">$3968</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <i class="icon-globe progress-group-icon"></i>
              <span class="title">Organic Search</span>
              <span class="ml-auto font-weight-bold">
                191,235
                <span class="text-muted small">(56%)</span>
              </span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>
        </b-card>

        <b-card body-class="bg-gray-custom-color">
          <b-row>
            <b-col>
              <h5 id="traffic" class="card-title mb-4">PRESET USAGE</h5>
            </b-col>
          </b-row>
          <p class="font-weight-bold">CARDIO</p>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Run 5K</span>
              <span class="ml-auto font-weight-bold">$5392</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                class="progress-xs bg-dark"
                style="height:20px"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Run 10K</span>
              <span class="ml-auto font-weight-bold">$9485</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Run 21K</span>
              <span class="ml-auto font-weight-bold">$3968</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>
          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Run 42K</span>
              <span class="ml-auto font-weight-bold">$3968</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <p class="font-weight-bold mt-4">RESISTANCE</p>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Preset 01</span>
              <span class="ml-auto font-weight-bold">$5392</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                class="progress-xs bg-dark"
                style="height:20px"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Preset 02</span>
              <span class="ml-auto font-weight-bold">$9485</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Preset 03</span>
              <span class="ml-auto font-weight-bold">$3968</span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>

          <div class="progress-group">
            <div class="progress-group-header">
              <span class="title">Preset 04</span>
              <span class="ml-auto font-weight-bold">
                191,235
                <span class="text-muted small">(56%)</span>
              </span>
            </div>
            <div class="progress-group-bars">
              <b-progress
                height="{}"
                style="height:20px"
                class="progress-xs bg-dark"
                :value="56"
                variant="success"
              ></b-progress>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import CardLine1ChartExample from "./CardLine1ChartExample";
import CardLine2ChartExample from "./CardLine2ChartExample";
import CardLine3ChartExample from "./CardLine3ChartExample";
import CardBarChartExample from "./CardBarChartExample";
import MainChartExample from "./MainChartExample";
import SocialBoxChartExample from "./SocialBoxChartExample";
import CalloutChartExample from "./CalloutChartExample";
import { Callout } from "@coreui/vue";

import BarExample from "../charts/BarExample";
import LineExample from "../charts/LineExample";
import DoughnutExample from "../charts/DoughnutExample";
import RadarExample from "../charts/RadarExample";
import PieExample from "../charts/PieExample";
import PolarAreaExample from "../charts/PolarAreaExample";

export default {
  name: "CustomDashboard",
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample,

    BarExample,
    LineExample,
    DoughnutExample,
    RadarExample,
    PieExample,
    PolarAreaExample
  },
  data: function() {
    return {
      selected: "Month"
    };
  },
  methods: {
    variant(value) {
      let $variant;
      if (value <= 25) {
        $variant = "info";
      } else if (value > 25 && value <= 50) {
        $variant = "success";
      } else if (value > 50 && value <= 75) {
        $variant = "warning";
      } else if (value > 75 && value <= 100) {
        $variant = "danger";
      }
      console.log("Check variant", $variant);
      return $variant;
    },
    flag(value) {
      return "flag-icon flag-icon-" + value;
    }
  }
};
</script>


<style lang="">
/* IE fix */
/* #card-chart-01,
#card-chart-02 {
  width: 100% !important;
} */
</style>