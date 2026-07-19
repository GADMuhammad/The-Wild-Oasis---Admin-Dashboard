import { forwardRef } from "react";
import styled from "styled-components";

const Checkbox = forwardRef(function Checkbox({ className, ...props }, ref) {
  return (
    <StyledWrapper className={className}>
      <label className="ac-container">
        <input type="checkbox" ref={ref} {...props} />
        <div className="ac-checkmark">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 49.548 49.549"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <g>
                  <path
                    d="M30.203,4.387v4.385c7.653,2.332,13.238,9.451,13.238,17.857c0,10.293-8.373,18.667-18.667,18.667
      				S6.106,36.922,6.106,26.629c0-8.405,5.585-15.525,13.238-17.857V4.387C9.323,6.835,1.855,15.866,1.855,26.629
      				c0,12.639,10.281,22.92,22.919,22.92s22.92-10.281,22.92-22.92C47.694,15.865,40.224,6.835,30.203,4.387z"
                  />
                </g>
                <g>
                  <path
                    d="M24.776,27.225c-1.41,0-2.554-1.145-2.554-2.555V2.554c0-1.41,1.144-2.554,2.554-2.554c1.41,0,2.554,1.144,2.554,2.554
      				V24.67C27.33,26.08,26.186,27.225,24.776,27.225z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </label>
    </StyledWrapper>
  );
});

const StyledWrapper = styled.div`
  /* Hide the default checkbox */
  .ac-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .ac-container {
    display: inline-flex;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    padding: 10px;
    border-radius: 50%;
    background-color: #212121;
  }

  /* Create a custom checkbox */
  .ac-checkmark {
    position: relative;
    height: 44px;
    width: 44px;
    border-radius: 10em;
    background-color: #212121;
    transition: 0.3s;
    box-shadow:
      4px 4px 6px #000000,
      -4px -4px 6px #3c3c3c;
  }

  .ac-checkmark svg {
    width: 28px;
    height: 28px;
    margin-top: 7px;
    margin-left: 8px;
    fill: #264d39;
    transition: 0.2s;
  }

  .ac-checkmark:active {
    box-shadow:
      2px 2px 3px #000000,
      -2px -2px 3px #3c3c3c;
  }

  /* When the checkbox is checked */
  .ac-container input:checked ~ .ac-checkmark {
    box-shadow:
      4px 4px 6px #000000,
      -4px -4px 6px #3c3c3c;
  }

  .ac-container input:checked ~ .ac-checkmark svg {
    fill: #00ff7b;
  }

  .ac-container input:checked ~ .ac-checkmark:active {
    box-shadow:
      2px 2px 3px #000000,
      -2px -2px 3px #3c3c3c;
  }
`;

export default Checkbox;
