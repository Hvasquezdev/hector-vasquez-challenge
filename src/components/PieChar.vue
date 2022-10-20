<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const pieChart = ref(null);
let root = null;

onMounted(() => {
  root = am5.Root.new(pieChart.value);

  root.setThemes([am5themes_Animated.new(root)]);

  const chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      endAngle: 200,
    })
  );

  const series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "label",
      endAngle: 270,
      radius: am5.percent(60),
    })
  );
  series.labels.template.set("forceHidden", true);
  series.ticks.template.set("forceHidden", true);

  series.states.create("hidden", {
    endAngle: -90,
  });

  series.data.setAll(props.data);

  series.appear(1000, 100);

  let legend = chart.children.unshift(am5.Legend.new(root, {}));
  legend.data.setAll(series.dataItems);
});

onBeforeUnmount(() => {
  if (root) root?.dispose();
});
</script>

<template>
  <div class="pie-chart" ref="pieChart"></div>
</template>

<style>
.pie-chart {
  width: 100%;
  height: 300px;
}
</style>
