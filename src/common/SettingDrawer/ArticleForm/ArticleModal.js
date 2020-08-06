import { useId } from "@reach/auto-id";
import * as React from "react";
import { memo } from "react";

import {
  Button,
  ModalHeader,
  ModalTransition,
  ModalBody,
  ModalOverlay,
  ModalContent,
} from "components";
import { Form, Input } from "common/FormFields";

export const ArticleModal = memo(({ isOpen, handleClose, onSubmit }) => {
  const labelId = `label--${useId()}`;

  const handleSubmit = (data) => {
    onSubmit({
      ...data,
      reaction: 0,
      comment: 0,
    });
    handleClose();
  };

  return (
    <ModalTransition isOpen={isOpen}>
      {(styles) => (
        <ModalOverlay
          isOpen={isOpen}
          onDismiss={handleClose}
          className="z-50 flex items-center justify-center"
          style={{ opacity: styles.opacity }}
          // initialFocusRef={buttonRef}
        >
          <ModalContent
            aria-labelledby={labelId}
            className="relative top-0 left-0 w-full z-50 focus:outline-none"
            style={{ ...styles }}
          >
            <ModalHeader className="text-center !py-4">
              <h3 className="w-full font-semibold text-xl text-center text-gray-800 dark:text-gray-100 mb-1">
                Add Article
              </h3>
            </ModalHeader>
            <ModalBody className="py-4">
              <Form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  variant="filled"
                  name="title"
                  placeholder="Type article's title..."
                  label="Title"
                />
                <Input
                  variant="filled"
                  name="description"
                  placeholder="Type article's description..."
                  label="Description"
                />
                <Input
                  variant="filled"
                  name="htmlUrl"
                  placeholder="Type article's url..."
                  label="URL"
                />

                <Button variantColor="gray" className="w-full" type="submit">
                  Submit
                </Button>
              </Form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </ModalTransition>
  );
});
