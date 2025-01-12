export const Youtube = ({
  style,
  className,
  onClick,
}: {
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
    onClick={onClick}
  >
    <g clipPath="url(#clip0_1_991)">
      <path
        d="M12.4298 20.4962L20.4798 15.5107L12.4298 10.5251V20.4962ZM30.36 7.48391C30.5617 8.26498 30.7013 9.31195 30.7943 10.6414C30.9029 11.9709 30.9495 13.1176 30.9495 14.1147L31.0425 15.5107C31.0425 19.1501 30.7943 21.8257 30.36 23.5374C29.9723 25.0331 29.0727 25.997 27.6767 26.4124C26.9477 26.6285 25.6138 26.778 23.5664 26.8777C21.55 26.9941 19.7042 27.0439 17.9981 27.0439L15.5319 27.1436C9.03292 27.1436 4.98464 26.8777 3.38705 26.4124C1.99109 25.997 1.09147 25.0331 0.703708 23.5374C0.50207 22.7563 0.362474 21.7094 0.269411 20.3799C0.160836 19.0504 0.114304 17.9037 0.114304 16.9066L0.0212402 15.5107C0.0212402 11.8712 0.269411 9.19562 0.703708 7.48391C1.09147 5.98824 1.99109 5.02436 3.38705 4.6089C4.11605 4.39286 5.44996 4.24329 7.49737 4.14358C9.51375 4.02725 11.3595 3.9774 13.0657 3.9774L15.5319 3.87769C22.0308 3.87769 26.0791 4.14358 27.6767 4.6089C29.0727 5.02436 29.9723 5.98824 30.36 7.48391Z"
        fill="#803BF1"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_991">
        <rect
          width="31.0213"
          height="31.0213"
          fill="white"
          transform="translate(0.0212402)"
        />
      </clipPath>
    </defs>
  </svg>
);