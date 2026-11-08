// Centralized API client for JSON Server running at http://localhost:9999

export const API_BASE = 'http://localhost:9999';

// Bank info from uploaded TPBank QR
export const BANK_INFO = {
  bankName: 'TPBank',
  bankFullName: 'Ngân hàng TMCP Tiên Phong',
  accountHolder: 'NGUYEN DINH THE ANH',
  accountNumber: '3850 2042 006',
  qrCodeImage: '/images/tpbank_qr.png'
};

export const GAME_METADATA = {
  g_lol: {
    id: 'g_lol',
    code: 'LOL',
    collection: 'lolAccounts',
    name: 'League of Legends (LMHT)',
    category: 'MOBA PC',
    publisher: 'Riot Games',
    badge: 'LOL',
    color: '#00E5FF',
    icon: 'bi-gem'
  },
  g_tft: {
    id: 'g_tft',
    code: 'TFT',
    collection: 'tftAccounts',
    name: 'Teamfight Tactics (ĐTCL)',
    category: 'Auto Battler',
    publisher: 'Riot Games',
    badge: 'TFT',
    color: '#FFB800',
    icon: 'bi-puzzle-fill'
  },
  g_delta: {
    id: 'g_delta',
    code: 'DELTA',
    collection: 'deltaAccounts',
    name: 'Delta Force Tactical',
    category: 'FPS Quân Sự',
    publisher: 'Tencent / TiMi',
    badge: 'DELTA',
    color: '#FF3366',
    icon: 'bi-crosshair2'
  },
  g_lq: {
    id: 'g_lq',
    code: 'LQMB',
    collection: 'lqAccounts',
    name: 'Liên Quân Mobile',
    category: 'MOBA Mobile',
    publisher: 'Garena',
    badge: 'LQMB',
    color: '#9D00FF',
    icon: 'bi-lightning-charge-fill'
  }
};

export const normalizeGameKey = (key) => {
  if (!key) return 'g_lol';
  const lower = key.toLowerCase();
  if (lower === 'g_lol' || lower === 'lol') return 'g_lol';
  if (lower === 'g_tft' || lower === 'tft') return 'g_tft';
  if (lower === 'g_delta' || lower === 'delta') return 'g_delta';
  if (lower === 'g_lq' || lower === 'lq' || lower === 'lqmb') return 'g_lq';
  return 'g_lol';
};

export const getCollectionName = (gameKey) => {
  const norm = normalizeGameKey(gameKey);
  return GAME_METADATA[norm]?.collection || 'lolAccounts';
};

export const getGameCode = (gameKey) => {
  const norm = normalizeGameKey(gameKey);
  return GAME_METADATA[norm]?.code || 'LOL';
};

// Format currency in Vietnamese Dong (VND)
export const formatVND = (price) => {
  if (typeof price !== 'number') {
    price = Number(price) || 0;
  }
  return price.toLocaleString('vi-VN') + ' ₫';
};

// Generic Fetch wrapper with JSON parsing and error handling
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMsg = `API Error ${response.status}: ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.message) errorMsg = parsed.message;
    } catch {
      if (errorText) errorMsg = errorText;
    }
    throw new Error(errorMsg);
  }

  // If response is 204 No Content
  if (response.status === 204) return null;

  return await response.json();
}

// GAMES API
export const getGames = () => request('/games');

// ACCOUNTS API
export const getAccounts = (gameKey) => {
  const collection = getCollectionName(gameKey);
  return request(`/${collection}`);
};

export const getAllAccounts = async () => {
  try {
    const [lol, tft, delta, lq] = await Promise.all([
      request('/lolAccounts').catch(() => []),
      request('/tftAccounts').catch(() => []),
      request('/deltaAccounts').catch(() => []),
      request('/lqAccounts').catch(() => [])
    ]);

    return {
      LOL: lol,
      TFT: tft,
      DELTA: delta,
      LQMB: lq,
      // Also map by gameId
      g_lol: lol,
      g_tft: tft,
      g_delta: delta,
      g_lq: lq
    };
  } catch (error) {
    console.error('Error fetching all accounts:', error);
    return { LOL: [], TFT: [], DELTA: [], LQMB: [] };
  }
};

export const getAccountById = (gameKey, id) => {
  const collection = getCollectionName(gameKey);
  return request(`/${collection}/${id}`);
};

export const createAccount = (gameKey, data) => {
  const collection = getCollectionName(gameKey);
  return request(`/${collection}`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateAccount = (gameKey, id, data) => {
  const collection = getCollectionName(gameKey);
  return request(`/${collection}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};

export const deleteAccount = (gameKey, id) => {
  const collection = getCollectionName(gameKey);
  return request(`/${collection}/${id}`, {
    method: 'DELETE'
  });
};

// USERS API
export const getUsers = () => request('/users');

export const getUserById = (id) => request(`/users/${id}`);

export const createUser = (userData) => {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

export const updateUser = (id, userData) => {
  return request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(userData)
  });
};

// TRANSACTIONS API (Admin Approval Workflow with Resilient Fallback)
const LOCAL_STORAGE_TX_KEY = 'bonggo_transactions_db';

export const getTransactions = async () => {
  try {
    const data = await request('/transactions');
    if (Array.isArray(data)) {
      try {
        localStorage.setItem(LOCAL_STORAGE_TX_KEY, JSON.stringify(data));
      } catch {}
      return data;
    }
  } catch (err) {
    console.warn('API /transactions request failed, using localStorage fallback:', err.message);
  }

  // Fallback to localStorage
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_TX_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}

  return [];
};

export const createTransaction = async (txData) => {
  try {
    const result = await request('/transactions', {
      method: 'POST',
      body: JSON.stringify(txData)
    });
    // Update local cache
    try {
      const list = await getTransactions();
      const updated = [result || txData, ...list.filter(t => t.id !== (result?.id || txData.id))];
      localStorage.setItem(LOCAL_STORAGE_TX_KEY, JSON.stringify(updated));
    } catch {}
    return result || txData;
  } catch (err) {
    console.warn('POST /transactions failed on server, persisting locally:', err.message);
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_TX_KEY);
      const list = stored ? JSON.parse(stored) : [];
      const updated = [txData, ...list.filter(t => t.id !== txData.id)];
      localStorage.setItem(LOCAL_STORAGE_TX_KEY, JSON.stringify(updated));
      return txData;
    } catch {
      throw err;
    }
  }
};

export const updateTransaction = async (id, txData) => {
  let updatedObj = null;
  try {
    updatedObj = await request(`/transactions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(txData)
    });
  } catch (err) {
    console.warn('PATCH /transactions/:id failed on server, updating locally:', err.message);
  }

  // Update local cache
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_TX_KEY);
    if (stored) {
      const list = JSON.parse(stored);
      const updated = list.map((t) => (t.id === id ? { ...t, ...txData, ...(updatedObj || {}) } : t));
      localStorage.setItem(LOCAL_STORAGE_TX_KEY, JSON.stringify(updated));
    }
  } catch {}

  return updatedObj || { id, ...txData };
};

export const deleteTransaction = async (id) => {
  try {
    await request(`/transactions/${id}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('DELETE /transactions/:id failed on server, deleting locally:', err.message);
  }

  // Update local cache
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_TX_KEY);
    if (stored) {
      const list = JSON.parse(stored);
      const updated = list.filter((t) => t.id !== id);
      localStorage.setItem(LOCAL_STORAGE_TX_KEY, JSON.stringify(updated));
    }
  } catch {}

  return true;
};
