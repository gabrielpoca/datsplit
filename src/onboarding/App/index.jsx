import React from 'react';
import { Form } from 'react-form';

import Logo from '../../common/Logo';
import Button from '../../common/Button';
import FormTextInput from '../../common/FormTextInput';
import { Form as MyForm, Fieldset, Error, Actions } from '../../common/Form';

import { setName } from '../../localStorage';

import './index.css';

const errorValidator = values => ({
  name: !values.name ? 'I need your name to move forward' : null
});

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = 'DatSplit';
  }

  handleSubmit(values) {
    setName(values.name);
    this.props.history.push('/');
  }

  render() {
    return (
      <div styleName="root">
        <div styleName="content">
          <Form validate={errorValidator} onSubmit={this.handleSubmit}>
            {({ submitForm, errors, touched }) => (
              <MyForm onSubmit={submitForm}>
                <div styleName="logo">
                  <Logo />
                </div>
                <div styleName="body">
                  <p styleName="label">
                    By what name do you want to be known for?
                  </p>
                  <Fieldset>
                    <FormTextInput field="name" placeholder="Your name" />
                    <Error>
                      {touched.name && errors && errors.name
                        ? errors.name
                        : null}
                    </Error>
                  </Fieldset>
                  <Actions>
                    <Button full>
                      <button type="submit">Continue</button>
                    </Button>
                  </Actions>
                </div>
              </MyForm>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
