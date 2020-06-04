import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { lighten } from 'polished';
import AnimatedCheck from '../AnimatedCheck';

const FormStyled = styled.form`
  max-width: 500px;
  margin: auto;
`;

const FormSuccessMessageStyled = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ButtonStyled = styled.button`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  padding: 0.5rem 1rem;
  display: inline-block;
  margin: auto;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.white} !important;
  background-color: ${({ theme }) => theme.officeGreen} !important;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    transition: all 230ms ease;
    color: ${({ theme }) => lighten(0.1, theme.white)} !important;
    background-color: ${({ theme }) =>
      lighten(0.1, theme.officeGreen)} !important;
  }
`;

const encode = (data) => {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
};

const ContactForm = ({ placeholders, buttonSend, messages }) => {
  const theme = useTheme();
  const [formDisabled, setFormDisabled] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    'bot-field': '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDomEl = e.target;

    // Disable form
    setFormDisabled(true);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': formDomEl.getAttribute('name'),
          ...formData,
        }),
      });
      setFormSent(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setFormDisabled(false);
      setHasError(true);
    }
  };

  return (
    <>
      {formSent && (
        <div>
          <AnimatedCheck color={theme.officeGreen} />
          <FormSuccessMessageStyled>
            {messages.success}
          </FormSuccessMessageStyled>
        </div>
      )}
      {!formSent && (
        <FormStyled
          onSubmit={handleSubmit}
          name="contact"
          method="post"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <fieldset disabled={formDisabled}>
            <input
              className="is-hidden"
              name="bot-field"
              onChange={handleInputChange}
            />
            <div className="field">
              <div className="control">
                <input
                  name="name"
                  onChange={handleInputChange}
                  value={formData.name}
                  className="input"
                  type="text"
                  placeholder={placeholders.name}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="input"
                  type="email"
                  placeholder={placeholders.email}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <textarea
                  name="message"
                  onChange={handleInputChange}
                  value={formData.message}
                  className="textarea"
                  placeholder={placeholders.message}
                  required
                />
              </div>
            </div>
            <div className="field">
              {hasError && (
                <div className="notification is-warning">{messages.error}</div>
              )}
            </div>
            <div className="has-text-centered">
              <ButtonStyled className="button is-primary" type="submit">
                {buttonSend.title}
              </ButtonStyled>
            </div>
          </fieldset>
        </FormStyled>
      )}
    </>
  );
};

ContactForm.propTypes = {
  placeholders: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  buttonSend: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  messages: PropTypes.shape({
    success: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactForm;
