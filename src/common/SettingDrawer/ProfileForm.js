import * as React from "react";
import { memo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRecoilState } from "recoil";

import {
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Select,
  IconButton,
} from "components";
import { Trash2 } from "icons";
import * as S from "data/template";
// import { Input, Form } from "common/FormFields";

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

export const ProfileForm = memo(({ onClose }) => {
  const [profile, setProfile] = useRecoilState(S.profile);
  const { register, handleSubmit, control } = useForm({
    defaultValues: profile,
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socials",
  });

  const onSubmit = (data) => {
    setProfile(data);
    onClose();
  };
  // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  // setProfile(watchAllFields)
  // React.useEffect(() => {
  //   setProfile(watchAllFields)
  // }, [watchAllFields]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl>
        <FormLabel htmlFor="avatarUrl">Avatar Url</FormLabel>
        <Input
          variant="filled"
          ref={register()}
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Type your avatar..."
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          variant="filled"
          ref={register()}
          id="name"
          name="name"
          placeholder="Type your name..."
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input
          variant="filled"
          ref={register()}
          id="address"
          name="address"
          placeholder="Type your address..."
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="badge">Badge</FormLabel>
        <Input
          variant="filled"
          ref={register()}
          id="badge"
          name="badge"
          placeholder="Type your Badge..."
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="bio">Bio</FormLabel>
        <Textarea
          variant="filled"
          ref={register()}
          id="bio"
          name="bio"
          placeholder="Type your Bio..."
          rows={6}
        />
      </FormControl>

      <div className="flex flex-col space-y-4">
        <h5>Skills</h5>
        <ul className="space-y-4">
          {skillFields.map((item, index) => (
            <li
              key={item.id}
              className="w-full flex flex-no-wrap items-end space-x-4"
            >
              <FormControl className="w-1/2">
                <FormLabel htmlFor={`skills[${index}].name`}>Name</FormLabel>
                <Input
                  variant="filled"
                  ref={register()}
                  id={`skills[${index}].name`}
                  name={`skills[${index}].name`}
                  placeholder="Type your skill..."
                  defaultValue={item.name}
                />
              </FormControl>

              <FormControl className="w-1/2">
                <FormLabel htmlFor={`skills[${index}].color`}>Color</FormLabel>
                <Select
                  variant="filled"
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
                onClick={() => removeSkill(index)}
              >
                <Trash2 size={18} />
              </IconButton>
            </li>
          ))}
        </ul>
        <Button onClick={appendSkill} className="w-full" variantColor="pink">
          Add skill
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        <h5>Socials</h5>
        <ul className="space-y-4">
          {socialFields.map((item, index) => (
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
                onClick={() => removeSocial(index)}
              >
                <Trash2 size={18} />
              </IconButton>
            </li>
          ))}
        </ul>
        <Button onClick={appendSocial} className="w-full" variantColor="pink">
          Add Socials
        </Button>
      </div>

      <Button className="mt-4" variantColor="gray" type="submit">
        Preview
      </Button>
    </form>
  );
});
