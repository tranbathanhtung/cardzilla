import * as React from "react";
import { memo } from "react";
import { useFieldArray } from "react-hook-form";
import { Trash2 } from "react-feather";

import {
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Select,
  IconButton,
} from "components";

import { IsolateProfileFields } from "./IsolateProfileFields";

const colors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export const SkillFields = memo(({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <div className="flex flex-col space-y-4">
      <h5>Skills</h5>
      <ul className="space-y-4">
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="w-full flex flex-no-wrap items-end space-x-4"
          >
            <FormControl
              className="w-1/2"
              isInvalid={errors.skills?.[index]?.name}
            >
              <FormLabel htmlFor={`skills[${index}].name`}>Name</FormLabel>
              <Input
                variant="outline"
                ref={register({
                  required: "name is required",
                })}
                id={`skills[${index}].name`}
                name={`skills[${index}].name`}
                placeholder="Type your skill..."
                defaultValue={item.name}
              />
              {errors.skills && (
                <FormErrorMessage>
                  {errors.skills?.[index]?.name?.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl className="w-1/2">
              <FormLabel htmlFor={`skills[${index}].color`}>Color</FormLabel>
              <Select
                variant="outline"
                ref={register()}
                id={`skills[${index}].color`}
                name={`skills[${index}].color`}
                placeholder=""
                defaultValue={item.color}
                rootProps={{}}
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>
            </FormControl>

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
      {fields.length < 5 && (
        <Button
          onClick={append}
          variantColor="gray"
          className="w-full bg-gray-300"
        >
          Add skill
        </Button>
      )}
      <IsolateProfileFields control={control} fields={fields} name="skills" />
    </div>
  );
});
