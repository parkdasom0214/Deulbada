import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 3.4rem;
`;

export const ProductHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0 0 0;
  & button:last-child {
    margin-left: auto;
  }
`;

export const Border = styled.div`
  border-bottom: 1px solid #e5e5e5;
  margin-left: -3.4rem;
  margin-right: -3.4rem;
  margin-bottom: 1.05rem;
`;

export const H2 = styled.h2`
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
`;

export const ImageUploadWrapper = styled.label`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 322 / 204;
  border: 1px solid ${({ theme }) => theme.colors.white300};
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 2.0rem;
  background-color: ${({ theme }) => theme.colors.white200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const IconWrapper = styled.span`
  position: absolute;
  height: 3.6rem;
  bottom: 0.6rem;
  bottom: 8px;
  right: 8px;
  background-color: ${({ theme }) => theme.colors.white400};
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 1.8rem;
  color: ${({ theme }) => theme.colors.white700};
`;

export const InputText = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  font-size: 1.2rem;
  margin-bottom: 1.8rem;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.white300};
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #5CA14E;
  }
`;

export const TagList = styled.label`
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin: 0.4rem 0.4rem 0 0;
  margin-bottom: 1.8rem;
  background-color: ${({ theme }) => theme.colors.white200};
  border-radius: 9999px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.black};
`;

export const RemoveButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: red;
  }
`;

export const Select = styled.select.attrs((props) => ({
  hasValue: props.value !== "",
}))`
  height: 2.8rem;
  padding: 0 2rem 0 0;
  font-size: 1.2rem;
  color: ${({ hasValue, theme }) =>
    hasValue ? theme.colors.black : theme.colors.white300};
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  appearance: none;
  margin-bottom: 1.8rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #5CA14E;
  }

  option {
    color: ${({ theme }) => theme.colors.black};
  }
`;

