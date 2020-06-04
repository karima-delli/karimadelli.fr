import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import isEmail from 'validator/lib/isEmail';
import AnimatedCheck from './AnimatedCheck';
import Title from './Title';

const FUNCTION_ENDPOINT = '/.netlify/functions/subscribe-newsletter';

const FormStyled = styled.form`
  margin: auto;
  margin-top: 2rem;
  max-width: 600px;
`;

const InputControlStyled = styled.div`
  .icon.is-right.is-valid {
    color: ${({ theme }) => theme.officeGreen} !important;
  }
`;

const InputStyled = styled.input``;

const ButtonStyled = styled.button`
  font-family: ${({ theme }) => theme.fontFamiliesAlternate};
  color: ${(props) => props.theme.white} !important;
  text-transform: uppercase;
  padding: 0.5rem 1rem;

  &:hover {
    background: ${({ theme }) => lighten(0.1, theme.officeGreen)} !important;
  }
`;

const AnimatedCheckContainerStyled = styled.div`
  margin-top: 2rem;
`;

const NewsletterForm = ({ title, form }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailValid] = useState(false);
  const [formIsLoading, setFormLoading] = useState(false);
  const [formIsSent, setFormSent] = useState(false);
  const [formHasError, setFormHasError] = useState(false);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailValid(isEmail(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formIsLoading) {
      return;
    }

    setFormLoading(true);

    const formDomEl = e.target;
    const action = formDomEl.getAttribute('action');

    try {
      await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          email,
        }),
      });
      setFormSent(true);
    } catch (error) {
      setFormHasError(true);
    }

    setFormLoading(false);
  };

  return (
    <section className="section">
      <div className="container">
        <Title as="h2" section>
          {title}
        </Title>
        {!formIsSent && (
          <FormStyled onSubmit={handleSubmit} action={FUNCTION_ENDPOINT}>
            <div className="columns">
              <div className="column">
                <InputControlStyled className="control has-icons-right">
                  <InputStyled
                    name="email"
                    onChange={handleEmailChange}
                    value={email}
                    className="input"
                    type="email"
                    placeholder={form.placeholder}
                    required
                  />
                  {emailIsValid &&
                    !(formIsSent || formIsLoading || formHasError) && (
                      <span className="icon is-small is-right is-valid">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                </InputControlStyled>
                {formHasError && (
                  <p className="help is-danger">{form.messages.error}</p>
                )}
              </div>
              <div className="column is-narrow has-text-centered">
                <ButtonStyled
                  className={`button is-primary ${
                    formIsLoading ? 'is-loading' : ''
                  }`}
                  type="submit"
                  disabled={!emailIsValid || formHasError}
                >
                  {form.button.title}
                </ButtonStyled>
              </div>
            </div>
          </FormStyled>
        )}
        {formIsSent && (
          <AnimatedCheckContainerStyled>
            <AnimatedCheck color={theme.officeGreen} />
          </AnimatedCheckContainerStyled>
        )}
      </div>
    </section>
  );
};

NewsletterForm.propTypes = {
  title: PropTypes.string.isRequired,
  form: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    messages: PropTypes.shape({
      error: PropTypes.string.isRequired,
      success: PropTypes.string.isRequired,
    }).isRequired,
    button: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default NewsletterForm;

export const query = graphql`
  fragment NewsletterForm on Query {
    newsletterForm: newsletterFormYaml(lang: { eq: $lang }) {
      title
      form {
        placeholder
        messages {
          error
          success
        }
        button {
          title
        }
      }
    }
  }
`;
