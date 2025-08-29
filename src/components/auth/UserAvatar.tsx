import { Avatar } from "@mui/material";

type UserAvatarProps = {
  id: string;
  displayName: string;
  size?: number;
};

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 60%)`;
}

function stringToInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function UserAvatar({ id, displayName, size = 56 }: UserAvatarProps) {
  return (
    <Avatar
      sx={{
        bgcolor: stringToColor(id),
        width: size,
        height: size,
        fontSize: size / 2.5,
        fontWeight: 600,
      }}
    >
      {stringToInitials(displayName)}
    </Avatar>
  );
}
