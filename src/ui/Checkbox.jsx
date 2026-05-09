import styled from "styled-components";

const Checkbox = ({ checked, onChange, disabled = false, id, children }) => {
  return (
    <StyledWrapper disabled={disabled}>
      <div className="checkbox-container">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />

        <label className="checkbox-circle" htmlFor={!disabled ? id : ""}>
          <span className="tick_mark" />
        </label>

        {children && (
          <label className="checkbox-text" htmlFor={!disabled ? id : ""}>
            {children}
          </label>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .checkbox-circle {
    --size: 4.8rem;
    --shadow: calc(var(--size) * 0.07) calc(var(--size) * 0.1);
    position: relative;
    flex-shrink: 0;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    background-image: linear-gradient(
      45deg,
      #4caf50 0%,
      #81c784 46%,
      #c8e6c9 100%
    );
    box-shadow: 0 var(--shadow) rgba(0, 0, 0, 0.2);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
  }

  .checkbox-circle::before {
    content: "";
    position: absolute;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background: white;
    box-shadow: inset 0 var(--shadow) rgba(255, 255, 255, 0.8);
    transition:
      width 0.2s ease,
      height 0.2s ease;
  }

  .checkbox-circle:hover::before {
    width: 55%;
    height: 55%;
  }

  .checkbox-circle:active {
    transform: scale(0.92);
  }

  .tick_mark {
    position: relative;
    width: 2.4rem;
    height: 1.2rem;
    transform: rotate(-45deg);
    z-index: 2;
  }

  .tick_mark::before,
  .tick_mark::after {
    content: "";
    position: absolute;
    background: white;
    border-radius: 999px;
    opacity: 0;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .tick_mark::before {
    width: 0.4rem;
    height: 1.2rem;
    left: 0;
    bottom: 0;
    transform: translateY(-10px);
  }

  .tick_mark::after {
    width: 2.4rem;
    height: 0.4rem;
    left: 0;
    bottom: 0;
    transform: translateX(10px);
  }

  input[type="checkbox"]:checked + .checkbox-circle {
    background-image: linear-gradient(
      45deg,
      #2196f3 0%,
      #64b5f6 46%,
      #bbdefb 100%
    );

    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.18) 0px 10px 10px;
  }

  input[type="checkbox"]:checked + .checkbox-circle::before {
    width: 0;
    height: 0;
  }

  input[type="checkbox"]:checked + .checkbox-circle .tick_mark::before,
  input[type="checkbox"]:checked + .checkbox-circle .tick_mark::after {
    opacity: 1;
    transform: translate(0);
  }

  .checkbox-text {
    cursor: pointer;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    color: #374151;
  }

  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.6;
      .checkbox-circle,
      .checkbox-text {
        cursor: not-allowed;
      }
  `}
`;

export default Checkbox;
