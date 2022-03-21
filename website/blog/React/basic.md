---
id: basic
title: Basic of react
---

The NextAuth.js client library makes it easy to interact with sessions from React applications.

#### Example Session Object

```js
{
  user: {
    name: string,
    email: string,
    image: uri
  },
  accessToken: string,
  expires: "YYYY-MM-DDTHH:mm:ss.SSSZ"
}
```

:::tip
The session data returned to the client does not contain sensitive information such as the Session Token or OAuth tokens. It contains a minimal payload that includes enough data needed to display information on a page about the user who is signed in for presentation purposes (e.g name, email, image).

You can use the [session callback](/configuration/callbacks#session-callback) to customize the session object returned to the client if you need to return additional data in the session object.
:::

---
