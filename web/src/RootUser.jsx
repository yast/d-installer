import React, { useReducer, useEffect } from "react";
import { useInstallerClient } from "./context/installer";

import { Button, Form, FormGroup, Modal, ModalVariant, TextInput } from "@patternfly/react-core";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD": {
      return { ...state, ...action.payload };
    }
    case "ACCEPT": {
      return { ...state, isFormOpen: false };
    }

    case "CANCEL": {
      return { ...state, isFormOpen: false };
    }

    case "CHANGE": {
      return { ...state, ...action.payload };
    }

    case "OPEN": {
      return { ...state, isFormOpen: true };
    }

    default: {
      return state;
    }
  }
};

const initialState = {
  rootPassword: "",
  isFormOpen: false
};

export default function RootUser() {
  const client = useInstallerClient();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { rootPassword, isFormOpen } = state;
  const hiddenPassword = "_____DINSTALLALER_PASSWORD_SET";

  useEffect(async () => {
    const rootPassword = (await client.users.isRootPassword()) ? hiddenPassword : "";
    dispatch({
      type: "LOAD",
      payload: {
        rootPassword
      }
    });
  }, []);

  const open = () => dispatch({ type: "OPEN" });

  const cancel = () => dispatch({ type: "CANCEL" });

  const accept = async () => {
    // TODO: handle errors
    if (rootPassword !== hiddenPassword && rootPassword !== "") {
      await client.users.setRootPassword(rootPassword);
    }
    dispatch({ type: "ACCEPT" });
  };

  const rootLabel = () => {
    if (rootPassword === hiddenPassword) {
      return "Root Password Set.";
    } else {
      return "Root Password Not Set. ";
    }
  };

  const rootForm = () => {
    return (
      <FormGroup fieldId="rootPassword" label="Root Password">
        <TextInput
          id="rootPassword"
          type="password"
          aria-label="root password"
          value={rootPassword}
          onChange={v => dispatch({ type: "CHANGE", payload: { rootPassword: v } })}
        />
      </FormGroup>
    );
  };

  return (
    <>
      <Button variant="link" onClick={open}>
        {rootLabel()}
      </Button>

      <Modal
        isOpen={isFormOpen}
        showClose={false}
        variant={ModalVariant.small}
        title="Root Configuration"
        actions={[
          <Button key="confirm" variant="primary" onClick={accept}>
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={cancel}>
            Cancel
          </Button>
        ]}
      >
        <Form>{rootForm()}</Form>
      </Modal>
    </>
  );
}