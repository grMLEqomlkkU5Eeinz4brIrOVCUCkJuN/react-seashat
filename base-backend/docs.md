# Seshat API Documentation

Base URL: `/api/v1`

Swagger UI is also available at `/docs` when the server is running.

## Health

### `GET /health`

Returns the server health status.

**Response `200`**

```json
{
  "status": "ok",
  "timestamp": "2026-02-15T12:00:00.000Z"
}
```

| Field       | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| `status`    | string | Always `"ok"`                  |
| `timestamp` | string | ISO 8601 date-time of response |

## Words

All word endpoints query the trie loaded from the ENABLE word list at server startup.

### `GET /words/search`

Check whether a word exists in the dictionary.

**Query Parameters**

| Param  | Type   | Required | Description             |
| ------ | ------ | -------- | ----------------------- |
| `word` | string | yes      | The word to search for (min length 1) |

**Response `200` — SearchResult**

```json
{
  "word": "hello",
  "found": true
}
```

| Field   | Type    | Description                          |
| ------- | ------- | ------------------------------------ |
| `word`  | string  | The word that was searched            |
| `found` | boolean | Whether the word exists in the trie  |

**Response `400`** — Validation error (missing or empty `word` param).

---

### `GET /words/starts-with`

Check whether any words in the dictionary start with the given prefix.

**Query Parameters**

| Param    | Type   | Required | Description                |
| -------- | ------ | -------- | -------------------------- |
| `prefix` | string | yes      | The prefix to check (min length 1) |

**Response `200` — StartsWithResult**

```json
{
  "prefix": "hel",
  "matches": true
}
```

| Field     | Type    | Description                                    |
| --------- | ------- | ---------------------------------------------- |
| `prefix`  | string  | The prefix that was searched                    |
| `matches` | boolean | Whether any words start with the given prefix  |

**Response `400`** — Validation error (missing or empty `prefix` param).

---

### `GET /words/prefix`

Get all words in the dictionary that start with the given prefix.

**Query Parameters**

| Param    | Type   | Required | Description                          |
| -------- | ------ | -------- | ------------------------------------ |
| `prefix` | string | yes      | The prefix to match against (min length 1) |

**Response `200` — PrefixWordsResult**

```json
{
  "prefix": "hel",
  "words": ["held", "helen", "hell", "hello", "help"]
}
```

| Field    | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| `prefix` | string   | The prefix that was searched              |
| `words`  | string[] | All words matching the given prefix      |

**Response `400`** — Validation error (missing or empty `prefix` param).

## Error Responses

All validation errors return a `400` status with the following shape:

```json
{
  "success": false,
  "message": "Validation error in query: ..."
}
```

Unmatched routes return `404`:

```json
{
  "success": false,
  "message": "Not found - /api/v1/unknown"
}
```
