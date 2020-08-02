import * as React from "react";
import { useFieldArray } from "react-hook-form";
import { Trash2 } from "react-feather";

import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  IconButton,
} from "components";

const socialTypes = [
  {
    type: "facebook",
    name: "Facebook",
  },
  {
    type: "instagram",
    name: "Instagram",
  },
  {
    type: "twitter",
    name: "Twitter",
  },
  {
    type: "linkedin",
    name: "Linkedin",
  },
];

export const SocialFields = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  return (
    <div className="flex flex-col space-y-4">
      <h5>Socials</h5>
      <ul className="space-y-4">
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="w-full flex flex-no-wrap items-end space-x-4"
          >
            <FormControl className="w-1/2">
              <FormLabel htmlFor={`socials[${index}].type`}>Type</FormLabel>
              <Select
                variant="filled"
                ref={register()}
                id={`socials[${index}].type`}
                name={`socials[${index}].type`}
                placeholder=""
                defaultValue={item.type}
                rootProps={{}}
              >
                {socialTypes.map((sc) => (
                  <option key={sc.type} value={sc.type}>
                    {sc.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl className="w-1/2">
              <FormLabel htmlFor={`socials[${index}].link`}>Link</FormLabel>
              <Input
                variant="filled"
                ref={register()}
                id={`socials[${index}].link`}
                name={`socials[${index}].link`}
                placeholder="Type your link..."
                defaultValue={item.link}
              />
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
      <Button onClick={append} className="w-full" variantColor="pink">
        Add Socials
      </Button>
    </div>
  );
};
