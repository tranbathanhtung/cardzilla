import React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { IconButton, Divider, Box, Flex } from "@chakra-ui/core";

// import { IconButton, Divider } from "components";
import { ChevronLeft, MapPin, Mail, Phone } from "icons";
import * as S from "data/template";

import { useStackDispatcher } from "../context/Stack";

const ContactStack = memo(() => {
  const dispatch = useStackDispatcher();
  const contact = useRecoilValue(S.contact);
  const profile = useRecoilValue(S.profile);

  return (
    <>
      <div>
        <div className="px-6 pt-4 h-full flex items-center">
          <div className="flex items-center">
            <IconButton
              size="md"
              onClick={() => dispatch({ type: "reset.stack" })}
              variantColor="gray"
              variant="ghost"
              isRound
              aria-label="Previous Stack"
            >
              <ChevronLeft size={24} />
            </IconButton>
            <div className="flex-1 flex items-center mx-2">
              <h3 className="!mt-2">{profile.name}</h3>
            </div>
            <div className="flex"></div>
          </div>
        </div>
      </div>

      <div className="px-8">

        <h4 className="mb-3">CONTACT</h4>
        <div className="!my-6 space-y-6">

          <div className="flex items-center">
            <Mail size={18} className="mr-2" />
            <Divider orientation="vertical" className="!my-0" />
            <h5>{contact.email}</h5>
          </div>

          <div className="flex items-center">
            <Phone size={18} className="mr-2" />
            <Divider orientation="vertical" className="!my-0" />
            <h5>{contact.phone}</h5>
          </div>

          <div className="flex items-center">
            <MapPin size={18} className="mr-2" />
            <Divider orientation="vertical" className="!my-0" />
            <h5>{contact.address}</h5>
          </div>

        </div>
      </div>
    </>
  );
})

export default ContactStack;
