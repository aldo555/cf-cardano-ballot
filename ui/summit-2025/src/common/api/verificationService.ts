import {
  DEFAULT_CONTENT_TYPE_HEADERS,
  doRequest,
  HttpMethods,
} from "../handlers/httpHandler";
import { env } from "../constants/env";
import {
  MerkleProofItem,
  SignedKeriRequest,
  SignedWeb3Request,
} from "../../types/voting-app-types";
import { Problem } from "../../types/user-verification-app-types";
import { VoteVerificationResult } from "../../types/voting-verification-app-types";
import { resolveWalletType } from "./utils";
import { VerificationStartedExtended } from "../../store/reducers/userCache/userCache.types";

export const USER_VERIFICATION_URL = `${env.VOTING_USER_VERIFICATION_SERVER_URL}/api/user-verification/verified`;
export const VERIFICATION_URL = `${env.VOTING_VERIFICATION_APP_SERVER_URL}/api/verification/verify-vote`;
export const START_VERIFICATION_URL = `${env.VOTING_USER_VERIFICATION_SERVER_URL}/api/sms/user-verification/start-verification`;
export const CONFIRM_PHONE_NUMBER_CODE_URL = `${env.VOTING_USER_VERIFICATION_SERVER_URL}/api/sms/user-verification/check-verification`;
export const DISCORD_VERIFICATION_URL = `${env.VOTING_USER_VERIFICATION_SERVER_URL}/api/discord/user-verification/check-verification`;

export const verifyVote = async (payload: {
  rootHash: string;
  steps: MerkleProofItem[];
  payload: string;
  walletId: string;
  signature: string;
  publicKey: string | undefined;
}) => {
  return await doRequest<Problem | VoteVerificationResult>(
    HttpMethods.POST,
    `${VERIFICATION_URL}`,
    DEFAULT_CONTENT_TYPE_HEADERS,
    JSON.stringify({
      ...payload,
      eventId: env.EVENT_ID,
      walletType: resolveWalletType(payload.walletId),
    }),
  );
};
export const getIsVerified = async (walletIdentifier: string) => {
  return await doRequest<{ verified: boolean }>(
    HttpMethods.GET,
    `${USER_VERIFICATION_URL}/${env.EVENT_ID}/${resolveWalletType(walletIdentifier)}/${walletIdentifier}`,
    {
      ...DEFAULT_CONTENT_TYPE_HEADERS,
    },
  );
};

export const sendSmsCode = async (
  walletIdentifier: string,
  phoneNumber: string,
) => {
  return await doRequest<VerificationStartedExtended>(
    HttpMethods.POST,
    `${START_VERIFICATION_URL}`,
    {
      ...DEFAULT_CONTENT_TYPE_HEADERS,
    },
    JSON.stringify({
      eventId: env.EVENT_ID,
      walletId: walletIdentifier,
      walletType: resolveWalletType(walletIdentifier),
      phoneNumber,
    }),
  );
};

export const confirmPhoneNumberCode = async (
  walletIdentifier: string,
  phoneNumber: string,
  requestId: string,
  verificationCode: string,
) => {
  return await doRequest(
    HttpMethods.POST,
    `${CONFIRM_PHONE_NUMBER_CODE_URL}`,
    {
      ...DEFAULT_CONTENT_TYPE_HEADERS,
    },
    JSON.stringify({
      eventId: env.EVENT_ID,
      walletId: walletIdentifier,
      walletType: resolveWalletType(walletIdentifier),
      phoneNumber,
      requestId,
      verificationCode,
    }),
  );
};

export const verifyDiscord = async (
  walletIdentifier: string,
  secret: string,
  signedMessagedEnvelope: SignedKeriRequest | SignedWeb3Request,
) => {
  return await doRequest<{ verified: boolean }>(
    HttpMethods.POST,
    `${DISCORD_VERIFICATION_URL}`,
    {
      ...DEFAULT_CONTENT_TYPE_HEADERS,
    },
    JSON.stringify({
      eventId: env.EVENT_ID,
      walletId: walletIdentifier,
      walletType: resolveWalletType(walletIdentifier),
      secret,
      ...signedMessagedEnvelope,
    }),
  );
};
