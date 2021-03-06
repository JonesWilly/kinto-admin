/* @flow */

import type { ServerHistoryEntry } from "../types";
import { HISTORY_ADD, HISTORY_CLEAR } from "../constants";
import { loadHistory, saveHistory, clearHistory } from "../store/localStore";

const INITIAL_STATE: ServerHistoryEntry[] = loadHistory();

export default function history(
  state: ServerHistoryEntry[] = INITIAL_STATE,
  action: Object
): ServerHistoryEntry[] {
  switch (action.type) {
    case HISTORY_ADD: {
      const filteredHistory = state.filter(
        entry => entry.server != action.server
      );
      return saveHistory(
        [{ server: action.server, authType: action.authType }].concat(
          filteredHistory
        )
      );
    }
    case HISTORY_CLEAR: {
      return clearHistory();
    }
    default: {
      return state;
    }
  }
}
