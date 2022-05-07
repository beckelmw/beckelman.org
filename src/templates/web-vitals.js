export const WebVitals = () => {
  return `<script type="module">
    import {
      getCLS,
      getFID,
      getLCP,
    } from "https://unpkg.com/web-vitals?module";

    function sendToAnalytics(metric) {
      const body = JSON.stringify(metric);
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/web-vitals", body);
      } else {
        fetch("/web-vitals", { body, method: "POST", keepalive: true });
      }
    }

    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getLCP(sendToAnalytics);
  </script>`;
};
