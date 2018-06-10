import React from "react";

const SpinnerIcon = props => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="none"
      d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z"
      stroke="currentColor"
      strokeWidth={2}
      strokeDasharray="2.5658892822265624 2.5658892822265624"
    >
      <animate
        attributeName="stroke-dashoffset"
        calcMode="linear"
        values="0;256.58892822265625"
        keyTimes="0;1"
        dur={1}
        begin="0s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default SpinnerIcon;