import * as React from "react";
import { memo } from "react";
import { useFieldArray } from "react-hook-form";

import { Input, FormControl, FormLabel } from "components";

export const RepoFields = memo(({ control, register }) => {
  const { fields } = useFieldArray({
    control,
    name: "repos",
  });

  return (
    <div className="flex flex-col space-y-4">
      <h4 className="uppercase font-semibold my-3">Pinned</h4>
      <ul className="space-y-4">
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="w-full flex flex-no-wrap items-end space-x-4"
          >
            <FormControl isDisabled className="w-1/2">
              <FormLabel htmlFor={`repos[${index}].name`}>Name</FormLabel>
              <Input
                variant="outline"
                ref={register()}
                id={`repos[${index}].name`}
                name={`repos[${index}].name`}
                placeholder="Type your repo name..."
                defaultValue={item.name}
              />
            </FormControl>

            <FormControl isDisabled className="w-1/2">
              <FormLabel htmlFor={`repos[${index}].description`}>
                Description
              </FormLabel>
              <Input
                variant="outline"
                ref={register()}
                id={`repos[${index}].description`}
                name={`repos[${index}].description`}
                placeholder="Type your repo description..."
                defaultValue={item.description}
              />
            </FormControl>

            <Input
              type="hidden"
              variant="outline"
              ref={register()}
              id={`repos[${index}].htmlUrl`}
              name={`repos[${index}].htmlUrl`}
              placeholder=""
              defaultValue={item.htmlUrl}
            />

            <Input
              type="hidden"
              variant="outline"
              ref={register()}
              id={`repos[${index}].language`}
              name={`repos[${index}].language`}
              placeholder=""
              defaultValue={item.language}
            />

            <Input
              type="hidden"
              variant="outline"
              ref={register()}
              id={`repos[${index}].languageColor`}
              name={`repos[${index}].languageColor`}
              placeholder=""
              defaultValue={item.languageColor}
            />

            <Input
              type="hidden"
              variant="outline"
              ref={register()}
              id={`repos[${index}].star`}
              name={`repos[${index}].star`}
              placeholder=""
              defaultValue={item.star}
            />

            <Input
              type="hidden"
              variant="outline"
              ref={register()}
              id={`repos[${index}].fork`}
              name={`repos[${index}].fork`}
              placeholder=""
              defaultValue={item.fork}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});
