/*
 * Copyright (c) [2022] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of version 2 of the GNU General Public License as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, contact SUSE LLC.
 *
 * To contact SUSE LLC about this file by physical or electronic mail, you may
 * find current contact information at www.suse.com.
 */

import React from "react";
import { Skeleton } from "@patternfly/react-core";

const MAX = 100;

const InstallerSkeleton = ({ lines = 2, ...props }) => (
  [...Array(lines)].map((_, i) => {
    const width = Math.floor(Math.random() * MAX);
    return (
      <Skeleton
        className="installer-skeleton"
        key={i}
        screenreaderText="Waiting..."
        fontSize="sm"
        {...props}
        width={`${width}%`}
      />
    );
  })
);

export default InstallerSkeleton;
