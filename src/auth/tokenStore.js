let memory = { access: null, refresh: null };

export function setTokens(access, refresh) {
  memory.access = access || null;
  memory.refresh = refresh || null;

}

export function getAccessToken() {
  return memory.access; 
}

export function getRefreshToken() {
  return memory.refresh; 
}

export function clearTokens() {
  memory = { access: null, refresh: null };
}

export function isAuthenticated() {
  return !!getAccessToken();
}