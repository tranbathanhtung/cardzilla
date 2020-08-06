import * as React from "react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Trash2 } from "react-feather";

import {
  Input,
  FormControl,
  FormLabel,
  IconButton,
  Button,
} from "components";

import { IsolateArticleFields } from "./IsolateArticleFields";
import { ArticleModal } from "./ArticleModal";

export const ArticleFields = ({ control, register }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "articles",
  });

  const handleSubmit = (newArticle) => {
    append(newArticle);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h4 className="uppercase font-semibold my-3">Articles</h4>
      <ul className="space-y-4">
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="w-full flex flex-no-wrap items-end space-x-4"
          >
            <FormControl isDisabled className="w-1/2">
              <FormLabel htmlFor={`articles[${index}].name`}>Title</FormLabel>
              <Input
                variant="outline"
                ref={register()}
                id={`articles[${index}].title`}
                name={`articles[${index}].title`}
                placeholder="Type your article name..."
                defaultValue={item.title}
              />
            </FormControl>

            <FormControl isDisabled className="w-1/2">
              <FormLabel htmlFor={`articles[${index}].description`}>
                Description
              </FormLabel>
              <Input
                variant="outline"
                ref={register()}
                id={`articles[${index}].description`}
                name={`articles[${index}].description`}
                placeholder="Type your article description..."
                defaultValue={item.description}
              />
            </FormControl>

            <Input
              type="hidden"
              variant="outline"
              ref={register()}
              id={`articles[${index}].htmlUrl`}
              name={`articles[${index}].htmlUrl`}
              placeholder=""
              defaultValue={item.htmlUrl}
            />

            <Input
              type="hidden"
              variant="outline"
              ref={register()}
              id={`articles[${index}].comment`}
              name={`articles[${index}].comment`}
              placeholder=""
              defaultValue={item.comment}
            />

            <Input
              type="hidden"
              variant="outline"
              ref={register()}
              id={`articles[${index}].reaction`}
              name={`articles[${index}].reaction`}
              placeholder=""
              defaultValue={item.reaction}
            />

            <IconButton
              size="md"
              variantColor="red"
              variant="solid"
              aria-label="Delete"
              onClick={() => remove(index)}
            >
              <Trash2 size={18} />
            </IconButton>
          </li>
        ))}
      </ul>
      <Button
        variantColor="gray"
        className="w-full bg-gray-300"
        onClick={() => setIsOpen(true)}
      >
        Add Article
      </Button>
      <ArticleModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
      <IsolateArticleFields control={control} fields={fields} name="articles" />
    </div>
  );
};
