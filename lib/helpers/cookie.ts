export const parseToDataType = <T>(
	value: string | undefined,
	isItRetry = false,
): T | undefined => {
	try {
		return value === "undefined" || value === undefined
			? undefined
			: (JSON.parse(value) as T);
	} catch (e) {
		if (!isItRetry) {
			return parseToDataType<T>(`"${value?.replaceAll?.('"', "")}"`, true);
		}

		return undefined;
	}
};

export const parseToCookieType = <T>(value: T) => {
	if (typeof value === "string") {
		return value;
	}

	return JSON.stringify(value);
};

export const getCookie = <T>(name: string): T | undefined => {
	const value = `; ${document.cookie}`;

	const [_, cookie] = value.split(`; ${name}=`);

	return cookie ? parseToDataType<T>(cookie.split(";")[0]) : undefined;
};

export const getCookies = <T extends Record<string, unknown> = Record<string, unknown>>(
	cookies: string[] = [],
): T => {
	if (cookies.length) {
		return cookies.reduce<Partial<T>>(
			(result, cookie) => ({
				...result,
				[cookie]: getCookie<T[typeof cookie]>(cookie),
			}),
			{},
		) as T;
	}

	return Object.fromEntries(
		document.cookie.split("; ").map((c) => {
			const [key, value] = c.split("=");
			return [key, parseToDataType<unknown>(value)];
		}),
	) as T;
};

export const setCookie = <T>(name: string, value: T, expireDays: number) => {
  const date = new Date();
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const expireDate = date.getTime() + expireDays * millisecondsInADay;

  date.setTime(expireDate);

  const expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${parseToCookieType(value)}; ${expires}; path=/;`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};


