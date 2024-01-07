import { Schema, model } from 'mongoose';
import { BloodGroup, Gender } from './mentor.constant';
import { MentorModel, TMentor, TUserName } from './mentor.interface';
import { UserStatus } from '../user/user.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
  },
});

const mentorSchema = new Schema<TMentor, MentorModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
mentorSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    '' +
    this?.name?.middleName +
    '' +
    this?.name?.lastName
  );
});

// filter out deleted documents
mentorSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

mentorSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

mentorSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
mentorSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Mentor.findOne({ id });
  return existingUser;
};

export const Mentor = model<TMentor, MentorModel>('Mentor', mentorSchema);
