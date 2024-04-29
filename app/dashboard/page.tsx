"use client";

import { SessionAuth } from "supertokens-auth-react/recipe/session";

export default function page() {
  return (
    <SessionAuth>
      <div>page</div>
    </SessionAuth>
  );
}
