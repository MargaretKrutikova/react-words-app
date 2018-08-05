import React from 'react';

const InfinityIcon = (props) => (
  <svg
    viewBox="0 0 92 42"
    preserveAspectRatio="xMidYMid"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="none"
      d="M20.3 1C7.4 1 1 14.3 1 21s6.4 20 19.3 20C39.6 41 52.4 1 71.7 1 84.6 1 91 14.3 91 21s-6.4 20-19.3 20C52.4 41 39.6 1 20.3 1z"
      stroke="currentColor"
      strokeWidth={2}
      strokeDasharray="2.5658892822265624 2.5658892822265624"
    >
      <animate
        attributeName="stroke-dashoffset"
        calcMode="linear"
        values="0;256.58892822265625"
        keyTimes="0;1"
        dur={props.dur || 1}
        begin="0s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default InfinityIcon;