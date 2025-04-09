import { create } from "zustand";

interface SelectedAccount {
  id: number;
  ig_user_id: string;
}

interface AccountStore {
  selectedAccount: SelectedAccount | null;
  setSelectedAccount: (account: SelectedAccount) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  selectedAccount: null,
  setSelectedAccount: (account) => set({ selectedAccount: account }),
}));
