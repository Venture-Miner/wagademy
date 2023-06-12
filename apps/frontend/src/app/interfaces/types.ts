export type Curriculum = {
  name: string | null;
  email: string | null;
  dateOfBirth: Date | null;
  cellphone: string | null;
  country: string | null;
  state: string | null;
  about: string | null;
  academicEducation: AcademicEducation[];
  expertise: string[];
  experience: Experience[];
  interest: string[];
  skillsAndCompetencies: string[];
};

export type AcademicEducation = {
  education: string | null;
  course: string | null;
  description: string | null;
};

export type Experience = {
  company: string | null;
  job: string | null;
  description: string | null;
};

export type About = {
  name: string | null;
  email: string | null;
  dateOfBirth: Date | null;
  cellphone: string | null;
  country: string | null;
  state: string | null;
  about: string | null;
};

export type RecommendedProfileData = {
  id: string;
  picture: { original: { url: string } } | null;
  bio: string | null;
};

export type Maybe<T> = T | null;

export type InputMaybe<T> = Maybe<T>;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlockchainData: any;
  BroadcastId: any;
  ChainId: any;
  CollectModuleData: any;
  ContentEncryptionKey: any;
  ContractAddress: any;
  CreateHandle: any;
  Cursor: any;
  DateTime: any;
  EncryptedValueScalar: any;
  Ens: any;
  EthereumAddress: any;
  FollowModuleData: any;
  Handle: any;
  HandleClaimIdScalar: any;
  IfpsCid: any;
  InternalPublicationId: any;
  Jwt: any;
  LimitScalar: any;
  Locale: any;
  Markdown: any;
  MimeType: any;
  NftGalleryId: any;
  NftGalleryName: any;
  NftOwnershipId: any;
  Nonce: any;
  NotificationId: any;
  ProfileId: any;
  ProfileInterest: any;
  ProxyActionId: any;
  PublicationId: any;
  PublicationTag: any;
  PublicationUrl: any;
  ReactionId: any;
  ReferenceModuleData: any;
  Search: any;
  Signature: any;
  Sources: any;
  TimestampScalar: any;
  TokenId: any;
  TxHash: any;
  TxId: any;
  UnixTimestamp: any;
  Url: any;
  Void: any;
};

export type FollowRequest = {
  follow: Array<Follow>;
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemParams>;
  profile: Scalars['ProfileId'];
};

export type FollowModuleRedeemParams = {
  /** The follower fee follower module */
  feeFollowModule?: InputMaybe<FeeFollowModuleRedeemParams>;
  /** The profile follower module */
  profileFollowModule?: InputMaybe<ProfileFollowModuleRedeemParams>;
  /** A unknown follow module */
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemParams>;
};

export type FeeFollowModuleRedeemParams = {
  /** The expected amount to pay */
  amount: ModuleFeeAmountParams;
};

export type ModuleFeeAmountParams = {
  /** The currency address */
  currency: Scalars['ContractAddress'];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String'];
};

export type ProfileFollowModuleRedeemParams = {
  /** The profile id to use to follow this profile */
  profileId: Scalars['ProfileId'];
};

export type UnknownFollowModuleRedeemParams = {
  /** The encoded data to submit with the module */
  data: Scalars['BlockchainData'];
};

export enum MetadataDisplayType {
  number = 'number',
  string = 'string',
  date = 'date',
}

export enum MetadataVersions {
  one = '1.0.0',
}

export interface AttributeData {
  displayType?: MetadataDisplayType;
  traitType?: string;
  value: string;
  key: string;
}

export interface ProfileMetadata {
  /**
   * The metadata version.
   */
  version: MetadataVersions;

  /**
   * The metadata id can be anything but if your uploading to ipfs
   * you will want it to be random.. using uuid could be an option!
   */
  metadata_id: string;

  /**
   * The display name for the profile
   */
  name: string | null;

  /**
   * The bio for the profile
   */
  bio: string | null;

  /**
   * Cover picture
   */
  cover_picture: string | null;

  /**
   * Any custom attributes can be added here to save state for a profile
   */
  attributes: AttributeData[];
}

export enum ACCOUNT_TYPE {
  physicalPerson = 'physicalPerson',
  company = 'company',
}
